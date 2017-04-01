import expect from 'expect.js';
import match from '../src/match/match.js';
import { MatchError } from '../src/match/errors.js';

export default () => {
  context('Value matching', () => {

    const getValueName = (value) =>  match (value) (
      (v= 1) => "one",
      (v= 2) => "two",
      (v= 2) => "another two",
      (v= "three") => "3",
      (v= undefined) => "undefined",
      (v= null) => "null",
      (v= true) => "true",
      (v= NaN) => "Not a number"
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

  context('Variables', () => {

    const getValueName = (number) =>  match (number) (
      (v= 1) => "one",
      (v= 2) => "two",
      (_) => "other",
      (v= 100) => "a hundred"
    )

    const getVar = (variable) =>  match (variable) (
      (whatever) => "Whatever was " + whatever
    )

    const getAnon = (variable) =>  match (variable) (
      (_) => _
    )

    it('should always match an annonymous variable if no previous value matches', () => {
      expect(getValueName(5)).to.equal("other");
    });

    it('should absorb further cases with an annonymous variable', () => {
      expect(getValueName(100)).to.equal("other");
    });

    it('should always match and bind a variable', () => {
      expect(getVar("Blah")).to.equal("Whatever was Blah");
    });

    it('should never bind an annonymous variable', () => {
      expect(getAnon("Blah")).to.equal(undefined);
    });

  });

  context('Context wrapping', () => {

    const bang = "!"

    const getValueName = (number) =>  match (number) (
      (v= 1) => "one"+bang,
      (v= 2) => "two"
    )

    it('should wrap external scope variables', () => {
      expect(getValueName(1)).to.equal("one!");
    });

  });

  
}
