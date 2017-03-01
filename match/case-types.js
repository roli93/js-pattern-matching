import { substringFrom, substringTo } from '../util/string-util.js';

const isUndeclared = (pattern) => {
  let result = false;
  try {
    eval(pattern);
  } catch(e) {
    if(e instanceof ReferenceError || e instanceof SyntaxError) result = true;
  }
  return result
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

  static extractedValue(){
    return null;
  }

}

class Annonymous {

  static matches(value, pattern){
    return true;
  }

  static applysFor(pattern){
    return pattern === "_"
  }

  static extractedValue(){
    return null;
  }


}

class Class {

  static matches(value, pattern){
    return value instanceof eval(pattern)
  }

  static applysFor(pattern){
    if(isUndeclared(pattern)) return false;
    return typeof eval(pattern) === 'function'
  }

  static extractedValue(){
    return null;
  }

}

class BindingClass {

  static matches(value, pattern){
    let className = substringFrom(pattern, "<")
    return value instanceof eval(className)
  }

  static applysFor(pattern){
    let className = substringFrom(pattern, "<")
    if(isUndeclared(className)) return false;
    return typeof eval(className) === 'function'
  }

  static extractedValue(pattern){
    return substringTo(pattern,"<");
  }

}

export default [
  PrimitiveValue,
  Annonymous,
  Class,
  BindingClass
];
