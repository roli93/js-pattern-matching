var babelTests = require('./babel-test.js').default;
var nonBabelTests = require('./non-babel-test.js');

describe('Basic Match', nonBabelTests);

describe('Match with Babel', babelTests);
