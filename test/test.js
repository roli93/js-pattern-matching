var expect = require('expect.js');
var match = require('../match.js');
var { MatchError } = require('../errors.js');

describe('Match', function() {
  context('Value matching', () => {

    const getNumberName = (number) =>  match (number) (
      (when= 1) => "one",
      (when= 2) => "two",
      (when= 2) => "another two"
    )

    it('should match a literal value', () => {
      expect(getNumberName(1)).to.equal("one");
    });

    it('should throw a MatchError when no literal value matches', () => {
      expect(() => getNumberName(3)).to.throwError((e) => expect(e).to.be.a(MatchError));
    });

    it('should match the first matching value', () => {
      expect(getNumberName(2)).to.equal("two");
    });

  });

  context('Annonymous variable', () => {

    const getNumberName = (number) =>  match (number) (
      (when= 1) => "one",
      (when= 2) => "two",
      (when= _) => "other"
    )

    it('should always match an annonymous variable if no previous value matches', () => {
      expect(getNumberName(5)).to.equal("other");
    });
  });

});
