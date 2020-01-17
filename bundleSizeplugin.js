const fs =require ('fs');
const path = require('path');

const customPlugin = 'bundleSizePlugin';

class bundleSizePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.done.tap(customPlugin, stats => {
      const { filename } = stats.compilation.options.output;
      const bundle = path.resolve(stats.compilation.options.output.path, filename);
      const { size } = fs.statSync(bundle);
      const { sizeLimit } = this.options;
      if (size <= sizeLimit) {
        console.log('Safe:Bundle-Size', size, '\n SIZE LIMIT:', sizeLimit);
      } else {
        console.error('Unsafe:Bundle-Size', size, '\n SIZE LIMIT:', sizeLimit);
      }
    });
  }
}

module.exports = bundleSizePlugin;
