var expect = require('expect.js');
var match = require('../match/match.js');
var { MatchError } = require('../match/errors.js');

describe('Match', function() {
  context('Value matching', () => {

    let obj = {key:"value"};

    const getValueName = (value) =>  match (value) (
      (when= 1) => "one",
      (when= 2) => "two",
      (when= 2) => "another two",
      (when= "three") => "3",
      (when= undefined) => "undefined",
      (when= null) => "null",
      (when= true) => "true",
      (when= NaN) => "Not a number"
    )

    it('should match a literal number value', () => {
      expect(getValueName(1)).to.equal("one");
    });

    it('should match a literal boolean value', () => {
      expect(getValueName(true)).to.equal("true");
    });

    it('should match a literal string value', () => {
      expect(getValueName("three")).to.equal("3");
    });

    it('should match a literal null value', () => {
      expect(getValueName(null)).to.equal("null");
    });

    it('should match a literal undefined value', () => {
      expect(getValueName(undefined)).to.equal("undefined");
    });

    it('should match a literal NaN value', () => {
      expect(getValueName(NaN)).to.equal("Not a number");
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

  context('Class matching', () => {

    const getValueName = (value) =>  match (value) (
      (when= 1) => "one",
      (when= EvalError) => "EvalError",
      (when= {message} < ReferenceError) => message,
      (when= Error) => "Other Error"
    )

    it('should match a value belonging to a class', () => {
      expect(getValueName(new EvalError())).to.equal("EvalError");
    });

    it('should match a value belonging to a subclass', () => {
      expect(getValueName(new RangeError() )).to.equal("Other Error");
    });

    it('should allow for the matching value to be used in the closure', () => {
      expect(getValueName(new ReferenceError("Undeclared varable") )).to.equal("Undeclared varable");
    });


  });

});
