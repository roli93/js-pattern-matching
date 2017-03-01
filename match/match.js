import { MatchError, ParseError } from './errors.js';
import Case from './case.js';

const match = (value) => (...functionCases) => {
  let cases = functionCases.map( aCase => new Case(aCase) )

  let matchingCase = cases.find( aCase => aCase.matches(value) )
  if(!matchingCase)
    throw new MatchError()

  return matchingCase.getResultFunction()(value)
}

module.exports = match
