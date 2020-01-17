const { getOptions } = require('loader-utils');

module.exports = function(source) {
  const options = getOptions(this);
  const { textToReplace, replacementText } = options;
  return source.replace(textToReplace, replacementText);
};
