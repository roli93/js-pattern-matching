import { substringFrom, substringTo, head, last } from '../util/string-util.js';

const isUndeclared = (pattern) => {
  let result = false;
  try {
    eval(pattern);
  } catch(e) {
    if(e instanceof ReferenceError || e instanceof SyntaxError) result = true;
  }
  return result
}

const isA = (value,type) => (type === "null" && value === null) || typeof value == type

class Binding {

  static binds(){
    return true;
  }

}

class NonBinding {

  static binds(){
    return false;
  }

}

class PrimitiveValue extends NonBinding{

  static matches(value, pattern){
    return Object.is(eval(pattern), value);
  }

  static applysFor(pattern){
    if(isUndeclared(pattern)) return false;
    let value = eval(pattern);
    return (
      isA(value, "number") || isA(value, "string") || isA(value, "boolean") || isA(value, "null") || isA(value, "undefined")
    );
  }

}

class Variable extends Binding {

  static matches(value, pattern){
    return true;
  }

  static applysFor(pattern){
    return (
      /^([a-z]|[A-Z]|_)(\w)*/.test(pattern) &&
      !PrimitiveValue.applysFor(pattern) &&
      !Class.applysFor(pattern) &&
      !AnnonymousVariable.applysFor(pattern)
    )
  }

}

class AnnonymousVariable extends NonBinding {

  static matches(value, pattern){
    return true;
  }

  static applysFor(pattern){
    return pattern === "_"
  }

}

class Class extends Binding {

  static matches(value, pattern){
    return value instanceof eval(pattern)
  }

  static applysFor(pattern){
    if(isUndeclared(pattern)) return false;
    return isA(eval(pattern), 'function')
  }
}

class GenericArray extends Binding {

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
    return pattern !== "[]" && head(pattern) === "[" && last(pattern) == "]"
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
  NonemptyArray,
  AnnonymousVariable
];
