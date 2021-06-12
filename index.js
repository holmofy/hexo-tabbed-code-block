'use strict';

const tabbedCodeBlock = require('./src/tabbed-code-block');

hexo.config.tabbedCodeBlock = Object.assign({
  enable: false,
  merge: true
}, hexo.config.tabbedCodeBlock);

const config = hexo.config.tabbedCodeBlock;

const codeBlockRegex = /(\s*)(```) *([^\n]+) *\n?([\s\S]+?)\s*(\2)(\n+|$)/g;

function ignore(data) {
  const source = data.source;
  const ext = source.substring(source.lastIndexOf('.')).toLowerCase();
  return ['.js', '.css', '.html', '.htm'].indexOf(ext) > -1;
}

/**
 * Tabbed code block tag
 *
 * Syntax:
 *   {% tabbed_codeblock %}
 *       <!-- tab [lang] -->
 *           content
 *       <!-- endtab -->
 *   {% endtabbed_codeblock %}
 * E.g:
 *   {% tabbed_codeblock %}
 *       <!-- tab js -->
 *           var test = 'test';
 *       <!-- endtab -->
 *       <!-- tab css -->
 *           .btn {
 *               color: red;
 *           }
 *       <!-- endtab -->
 *   {% endtabbed_codeblock %}
 */
hexo.extend.tag.register('tabbed_codeblock', (args, content) => {
  return tabbedCodeBlock(args.join(' '), content, hexo.config.highlight || {});
}, {
  ends: true
});

hexo.extend.filter.register('before_post_render', data => {
  if (!config.enable && !data.tabbedCodeBlock) {
    return;
  }
  if (!ignore(data)) {
    data.content = data.content.replace(codeBlockRegex, (raw, start, startQuote, lang, content, endQuote, end) => {
      return start +
        '{% tabbed_codeblock %}\n' +
        '<!-- tab ' + lang + ' -->\n' +
        content +
        '<!-- endtab -->\n' +
        '{% endtabbed_codeblock %}' +
        end;
    });
    // merge two adjacent blocks
    if (config.merge) {
      data.content = data.content.replace(/{% endtabbed_codeblock %}\s*{% tabbed_codeblock %}/g, '');
    }
  }
}, 9);

hexo.extend.filter.register('after_post_render', html => {
  const css = `
    figure figcaption .tabs {
      display: flex;
    }
    figure figcaption .tabs .tab {
      cursor: pointer;
      list-style: none;
      margin: 5px 10px;
    }
    figure figcaption .tabs .tab.active {
      background: #2d2d2d;
    }
  `;
  return html.replace(/<head>(?!<\/head>).+?<\/head>/s, str => str.replace('</head>', `<style>${css}</style></head>`));
});
