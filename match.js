let { MatchError, ParseError } = require('./errors.js');

const isType = (value) => {
  let result;
  try {
    result = typeof eval(value) === "function"
  } catch(e) {
    if(e instanceof ReferenceError) result = false
  }
  return result
}

const withoutWhitespaces = (string) => string.replace(/\s/g, '');

class Case {

  constructor(functionCase){
    this.resultFunction = functionCase
  }

  toString(){
    return withoutWhitespaces(this.resultFunction.toString())
  }

  isSintacticallyValid(){
    return /\(when=.*\)=>.*/.test(this.toString())
  }

  getPattern(){
    return this.toString().slice("(when=".length, this.toString().indexOf(")=>"))
  }

  getResultFunction(){
    return this.resultFunction
  }

  matches(value){
    return eval(this.getPattern()) == value;
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
