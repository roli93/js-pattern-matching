import { MatchError, ParseError } from './errors.js';
import CaseBuilder from './case.js';

const match = (value) => (...functionCases) => {
  let cases = functionCases.map( aCase => CaseBuilder.build(aCase) )

  let matchingCase = cases.find( aCase => aCase.matches(value) )
  if(!matchingCase)
    throw new MatchError()

  return matchingCase.getResultFunction()(matchingCase.binds()? value : undefined)
}

module.exports = match
