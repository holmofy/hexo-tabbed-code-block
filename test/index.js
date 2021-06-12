/* eslint-disable no-unused-vars */
var should = require('chai').should();
/* eslint-enable no-unused-vars */
var tabbedCodeBlock = require('../src/tabbed-code-block');

describe('tabbedCodeBlock', function () {
  it('render (basic)', function () {
    var content = tabbedCodeBlock(`
      \`\`\`java
      System.out.println("Hello World");
      \`\`\`
    `);
    content.should.equal(`
    `);
  });

  it('render (merge)', function () {
    var content = tabbedCodeBlock(`
      \`\`\`java
      System.out.println("Hello World");
      \`\`\`
    `);
    content.should.equal(`
     `);
  });
});
