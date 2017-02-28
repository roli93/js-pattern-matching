var expect = require('expect.js');
var match = require('../match.js');
var MatchError = require('../errors.js').MatchError;

describe('Match', function() {
  context('Value matching', () => {

    const getNumberName = (number) =>  match (number) (
      (when= 1) => "one",
      (when= 2) => "two"
    )

    it('should match a literal value', () => {
      expect(getNumberName(1)).to.equal("one");
    });

    it('should throw a MatchError when no literal value matches', () => {
      expect(() => getNumberName(3)).to.throwError((e) => expect(e).to.be.a(MatchError));
    });

  });
});
