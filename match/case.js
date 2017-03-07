import caseTypes from './case-types.js';
import { withoutWhitespaces, substringFrom } from '../util/string-util.js';

class Case {

  static types(){
    return caseTypes;
  }

  constructor(functionCase){
    this.resultFunction = functionCase;
    this.toString = () => functionCase.toString();
  }

  getPattern(){
    let cleanString = withoutWhitespaces(this.toString())
    let parameters = cleanString.slice(cleanString.indexOf("(") + 1, cleanString.indexOf(")=>"));
    return this.isValuePattern(parameters) ? substringFrom(parameters, "=") : parameters;
}

  isValuePattern(parameters){
    return parameters.includes("=")
  }

  getResultFunction(){
    return this.resultFunction
  }

  matches(value){
    return this.getType().matches(value, this.getPattern());
  }

  getType(){
    return Case.types().find( type => type.applysFor(this.getPattern()) )
  }

}

export default Case;
