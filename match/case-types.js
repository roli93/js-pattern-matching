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
    return (
      typeof value == "number" || typeof value == "string" || typeof value == "object" && !(value instanceof Array) ||
      typeof value == "boolean" || typeof value == "null" || typeof value == "undefined"
    );
  }

}

class Variable {

  static matches(value, pattern){
    return true;
  }

  static applysFor(pattern){
    return (
      /^([a-z]|[A-Z]|_)(\w)*/.test(pattern) &&
      !PrimitiveValue.applysFor(pattern) &&
      !Class.applysFor(pattern)
    )
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
}

class GenericArray {

  static matches(value, pattern){
    return value instanceof Array && this.emptinessHolds(value)
  }

}

class EmptyArray extends GenericArray {

  static applysFor(pattern){
    return pattern === "[]"
  }

  static emptinessHolds(value){
    return value.length === 0;
  }

}

class NonemptyArray extends GenericArray {

  static applysFor(pattern){
    return pattern[0] === "[" && pattern[pattern.length-1] == "]" && pattern !== "[]"
  }

  static emptinessHolds(value){
    return value.length > 0;
  }
}

export default [
  PrimitiveValue,
  Variable,
  Class,
  EmptyArray,
  NonemptyArray
];
