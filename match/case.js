import caseTypes from './case-types.js';

const withoutWhitespaces = (string) => string.replace(/\s/g, '');

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
    return eval(`()=>${this.toString().substring(this.toString().indexOf("=>")+2)}`)
  }

  matches(value){
    return this.getType().matches(value, this.getPattern())
  }

  getType(){
    return Case.types().find( type => type.applysFor(this.getPattern()) )
  }

}

export default Case;
