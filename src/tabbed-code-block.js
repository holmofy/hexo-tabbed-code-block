'use strict';

const util = require('hexo-util');
const highlight = util.highlight;
const stripIndent = require('strip-indent');
const JSDOM = require('jsdom').JSDOM;
const rCaptionUrl = /(\S[\S\s]*)\s+(https?:\/\/)(\S+)/i;
const rCaption = /(\S[\S\s]*)/;
const rTab = /<!--\s*tab (\w*)\s*-->\n([\w\W\s\S]*?)<!--\s*endtab\s*-->/g;
// create a window with a document to use jQuery library
const window = (new JSDOM('')).window;
const $ = require('jquery')(window);

/**
 * Tabbed code block
 * @param {Array} args
 * @param {String} content
 * @returns {string}
 */
function tabbedCodeBlock(args, content) {
  const arg = args.join(' ');
  const config = hexo.config.highlight || {};
  const matches = [];
  let match;
  let caption = '';
  let codes = '';

  // extract languages and source codes
  while ((match = rTab.exec(content))) {
    matches.push(match[1]);
    matches.push(match[2]);
  }
  // create tabs and tabs content
  for (let i = 0; i < matches.length; i += 2) {
    const lang = matches[i];
    let code = matches[i + 1];
    // trim code
    code = stripIndent(code).trim();

    if (config.enable) {
      // highlight code
      code = highlight(code, {
        lang: lang,
        gutter: config.line_number,
        tab: config.tab_replace,
        autoDetect: config.auto_detect
      });
    } else {
      code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      code = '<pre><code>' + code + '</code></pre>';
    }

    // used to parse HTML code and ease DOM manipulation
    const $code = $('<div>').append(code).find('>:first-child');
    // add tab
    // active the first tab
    // display the first code block
    if (i === 0) {
      caption += '<li class="tab active">' + lang + '</li>';
      $code.css('display', 'block');
    } else {
      $code.css('display', 'none');
      caption += '<li class="tab">' + lang + '</li>';
    }

    codes += $code.prop('outerHTML');
  }
  // build caption
  caption = '<ul class="tabs">' + caption + '</ul>';
  // add caption title
  if (rCaptionUrl.test(arg)) {
    match = arg.match(rCaptionUrl);
    caption = '<a href="' + match[2] + match[3] + '">' + match[1] + '</a>' + caption;
  } else if (rCaption.test(arg)) {
    match = arg.match(rCaption);
    caption = '<span>' + match[1] + '</span>' + caption;
  }

  codes = '<div class="tabs-content">' + codes + '</div>';
  // wrap caption
  caption = '<figcaption>' + caption + '</figcaption>';
  const html = '<figure class="codeblock codeblock--tabbed">' + caption + codes + '</figure>';
  return html;
}

module.exports = tabbedCodeBlock;
