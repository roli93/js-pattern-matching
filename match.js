let { MatchError, ParseError } = require('./errors.js');

const isUndeclared = (pattern) => {
  let result = false;
  try {
    eval(pattern);
  } catch(e) {
    if(e instanceof ReferenceError) result = true;
  }
  return result
}

const withoutWhitespaces = (string) => string.replace(/\s/g, '');

class Case {

  constructor(functionCase){
    this.stringCase = withoutWhitespaces(functionCase.toString())
  }

  toString(){
    return this.stringCase;
  }

  isSintacticallyValid(){
    return /\(when=.*\)=>.*/.test(this.toString())
  }

  getPattern(){
    return this.toString().slice("(when=".length, this.toString().indexOf(")=>"))
  }

  getResultFunction(){
    return eval(this.toString().replace("=" + this.getPattern(), ""))
  }

  matches(value){
    return this.getType().matches(value, this.getPattern())
  }

  getType(){
    if(Value.applysFor(this.getPattern())){
      return Value;
    } else if(Annonymous.applysFor(this.getPattern())){
      return Annonymous;
    }
  }

}

class Value {

  static matches(value, pattern){
    return eval(pattern) === value;
  }

  static applysFor(pattern){
    if(isUndeclared(pattern)) return false;
    let value = eval(pattern);
    return(
      typeof value == "number" || typeof value == "string" || typeof value == "symbol" ||
      typeof value == "boolean" || typeof value == "null" || typeof value == "undefined" || typeof value == "object"
    );
  }

}

class Annonymous {

  static matches(value, pattern){
    return true;
  }

  static applysFor(pattern){
    return pattern === "_"
  }

}

const validateCasesSintax = (cases) =>{
  if(!cases.every( aCase => aCase.isSintacticallyValid() ))
    throw new ParseError("All patterns should be in the form: (when= {pattern}) => {result}")
}

const match = (value) => (...functionCases) => {
  let cases = functionCases.map( aCase => new Case(aCase) )
  validateCasesSintax(cases);

  let matchingCase = cases.find( aCase => aCase.matches(value) )
  if(!matchingCase)
    throw new MatchError()

  return matchingCase.getResultFunction()()
}

module.exports = match
