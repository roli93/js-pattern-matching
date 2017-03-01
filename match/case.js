import caseTypes from './case-types.js';
import { withoutWhitespaces, substringFrom } from '../util/string-util.js';

class Case {

  static types(){
    return caseTypes;
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
    return eval(`(${this.getMatchingValue()?this.getMatchingValue():''})=>${substringFrom(this.toString(),"=>")}`);
  }

  matches(value){
    return this.getType().matches(value, this.getPattern());
  }

  getMatchingValue(){
    return this.getType().extractedValue(this.getPattern());
  }

  getType(){
    return Case.types().find( type => type.applysFor(this.getPattern()) )
  }

}

export default Case;
