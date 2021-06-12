'use strict';

// eslint-disable-next-line node/no-unpublished-require
require('chai').should();

describe('tabbedCodeBlock', () => {
  const tabbedCodeBlock = require('../src/tabbed-code-block');
  it('render (basic)', () => {
    const content = tabbedCodeBlock(`
      \`\`\`java
      System.out.println("Hello World");
      \`\`\`
    `);
    content.should.equal(`
    `);
  });

  it('render (merge)', () => {
    const content = tabbedCodeBlock(`
      \`\`\`java
      System.out.println("Hello World");
      \`\`\`
      \`\`\`javascript
      console.log("Hello World");
      \`\`\
    `);
    content.should.equal(`
     `);
  });
});
