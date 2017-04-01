import babelTests from './babel-test.js';
import nonBabelTests from './non-babel-test.js';

describe('Basic Match', nonBabelTests);

describe('Match with Babel', babelTests);
