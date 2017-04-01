import caseTypes from './case-types.js';
import { withoutWhitespaces, substringFrom } from '../util/string-util.js';

class Case {

  constructor(func, pattern, type){
    this.resultFunction = func;
    this.pattern = pattern;
    this.type = type;
  }

  getPattern(){
    return this.pattern;
  }

  getResultFunction(){
    return this.resultFunction
  }

  matches(value){
    return this.type.matches(value, this.getPattern());
  }

  binds(){
    return this.type.binds();
  }

}

class CaseBuilder {

  static types(){
    return caseTypes;
  }

  static build(caseDefinition){
    return new Case(
      this.getCaseFunction(caseDefinition),
      this.getCasePattern(caseDefinition),
      this.getCaseType(caseDefinition)
    );
  }

  static isBabelized(caseDefinition){
    let r = Boolean(caseDefinition.pattern) && Boolean(caseDefinition.function);
    return r
  }

  static getCaseFunction(caseDefinition){
    return this.isBabelized(caseDefinition)? caseDefinition.function : caseDefinition
  }

  static getCasePattern(caseDefinition){
    return this.isBabelized(caseDefinition)? caseDefinition.pattern : this.buildPattern(caseDefinition)
  }

  static getCaseType(caseDefinition){
    return CaseBuilder.types().find( type => type.applysFor(this.getCasePattern(caseDefinition)) )
  }

  static isValuePattern(parameters){
    return parameters.includes("=")
  }

  static buildPattern(caseDefinition){
    let cleanString = withoutWhitespaces(caseDefinition.toString())
    let parameters = cleanString.slice(cleanString.indexOf("(") + 1, cleanString.indexOf(")=>"));
    return this.isValuePattern(parameters) ? substringFrom(parameters, "=") : parameters;
  }

}

export default CaseBuilder;
