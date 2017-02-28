var expect = require('expect.js');
var match = require('../match.js');
var { MatchError } = require('../errors.js');

describe('Match', function() {
  context('Value matching', () => {

    const getValueName = (number) =>  match (number) (
      (when= 1) => "one",
      (when= 2) => "two",
      (when= 2) => "another two",
      (when= "three") => "3",
      (when= undefined) => "undefined",
      (when= null) => "null",
      (when= true) => "true",

    )

    it('should match a literal value', () => {
      expect(getValueName(1)).to.equal("one");
    });

    it('should throw a MatchError when no literal value matches', () => {
      expect(() => getValueName(3)).to.throwError((e) => expect(e).to.be.a(MatchError));
    });

    it('should match the first matching value', () => {
      expect(getValueName(2)).to.equal("two");
    });

  });

  context('Annonymous variable', () => {

    const getValueName = (number) =>  match (number) (
      (when= 1) => "one",
      (when= 2) => "two",
      (when= _) => "other",
      (when= 100) => "a hundred"
    )

    it('should always match an annonymous variable if no previous value matches', () => {
      expect(getValueName(5)).to.equal("other");
    });

    it('should absorb further cases with an annonymous variable', () => {
      expect(getValueName(100)).to.equal("other");
    });


  });

});
