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

  static types(){
    return [ PrimitiveValue, Annonymous ];
  }

  constructor(functionCase){
    this.toString = () => functionCase.toString();
    if(!this.isSintacticallyValid())
      throw new ParseError("All patterns should be in the form: (when= {pattern}) => {result}")
  }

  isSintacticallyValid(){
    return /\(when=.*\S+.*\)\s*=>.*/.test(this.toString())
  }

  getPattern(){
    let cleanString = withoutWhitespaces(this.toString())
    return this.pattern = cleanString.slice("(when=".length, cleanString.indexOf(")=>"));
  }

  getResultFunction(){
    return eval(`()=>${this.toString().substring(this.toString().indexOf("=>")+2)}`)
  }

  matches(value){
    return this.getType().matches(value, this.getPattern())
  }

  getType(){
    return Case.types().find( type => type.applysFor(this.getPattern()) )
  }

}

class PrimitiveValue {

  static matches(value, pattern){
    return Object.is(eval(pattern), value);
  }

  static applysFor(pattern){
    if(isUndeclared(pattern)) return false;
    let value = eval(pattern);
    return(
      typeof value == "number" || typeof value == "string" || typeof value == "object" ||
      typeof value == "boolean" || typeof value == "null" || typeof value == "undefined"
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

const match = (value) => (...functionCases) => {
  let cases = functionCases.map( aCase => new Case(aCase) )

  let matchingCase = cases.find( aCase => aCase.matches(value) )
  if(!matchingCase)
    throw new MatchError()

  return matchingCase.getResultFunction()()
}

module.exports = match
