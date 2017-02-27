class MatchError extends Error{}

const isType = (value) => {
  let result;
  try {
    result = typeof eval(value) === "function"
  } catch(e) {
    if(e instanceof ReferenceError) result = false
  }
  return result
}

const match = (value) => (cases) => {
  let matchingCase = Object.keys(cases).find((aCase) => {
    return(
      value == aCase ||
      isType(aCase) && aCase !== "Array" && value instanceof eval(aCase) ||
      aCase === "String" && typeof value === "string" ||
      aCase === "Array" && value instanceof Array && value.length >0 ||
      aCase === "Nil" && value instanceof Array && value.length === 0
    )
  })
  if(!matchingCase){
    throw new MatchError
  }

  return typeof cases[matchingCase] === "function"? cases[matchingCase](value) : cases[matchingCase]
}

/* Use example
match (e) ({
  String: "A string",
  pirulo: "It was pirulo!",
  123:() => "Number!",
  EvalError:({message}) => alert("There was an EvalError error: " + message),
  RangeError: 999
})

const sum = (list) => match (list) ({
  Array:([x,...xs]) => x + sum(xs),
  Nil: 0
})
*/

export default match;
