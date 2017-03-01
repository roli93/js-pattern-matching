const isUndeclared = (pattern) => {
  let result = false;
  try {
    eval(pattern);
  } catch(e) {
    if(e instanceof ReferenceError) result = true;
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

}

class Annonymous {

  static matches(value, pattern){
    return true;
  }

  static applysFor(pattern){
    return pattern === "_"
  }

}

export default [
  PrimitiveValue,
  Annonymous
];
