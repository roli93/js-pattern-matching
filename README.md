[![Build Status](https://travis-ci.org/roli93/js-pattern-matching.svg?branch=master) ]( https://travis-ci.org/roli93/js-pattern-matching)
[![Dependency Status](https://david-dm.org/roli93/js-pattern-matching.svg)](https://david-dm.org/roli93/js-pattern-matching)
[![devDependencies Status](https://david-dm.org/roli93/js-pattern-matching/dev-status.svg)](https://david-dm.org/roli93/js-pattern-matching?type=dev)

JS-Pattern-Matching
====================
A small library intended to provide simple Pattern Matching capabilities for JavaScript.

```javascript
var match = require('js-pattern-matching');

const sum = (list) =>  match (list) (
  ([x,...xs]) => x + sum(xs),
  ([]) => 0
)

console.log(sum([]));
// prints 0
console.log(sum([1,2,3]));
// prints 6
```

Installation
====================

```
npm install --save js-pattern-matching
```

JS-Pattern-Matching leverages ES2015 syntax to make more readable and easy-to-use code. Therefore, it can only be run in ES2015-supporting environments (Node ^4 or any platform transpiled with [Babel](https://babeljs.io/))

Babel
------
[Babel](https://babeljs.io/) is now supported by JS-Pattern-Matching! 

To make use of it, you just need to install the [Babel Plugin for JS-Pattern-Matching](https://www.npmjs.com/package/babel-plugin-js-pattern-matching)

```
npm install --save-dev babel-plugin-js-pattern-matching
```

Finally, you have to tell [Babel](https://babeljs.io/) to use it by adding it to your `.babelrc` file:

```javascript
{
  "presets": [
    "es2015"
  ],
  "plugins": [
      "babel-plugin-js-pattern-matching",
  ]
}
```

Using JS-Pattern-Matching
====================
We import the powerful `match` function by doing

```javascript
var match = require('js-pattern-matching');
```
### General Syntax

The syntax is always of the form:
```
match (valueToMatch)(
 listOfCommaSeparatedCaseClosures
)
```

Each case-closure has to be a valid ES2015 closure and is itself of the form `(pattern) => closureBody`

We explore different patterns in the following section

### Matching literal values

The pattern for literal values is always `(someVariable= matchingValue)`. By convention, we use the variable `v` which simply stands for "value", but any other valid JS identifier will do

* We can match literal values of primitive types: `number`, `string`, `boolean`, `null`, `undefined`:
```javascript
const getValue = (value) =>  match (value) (
  (v= 1) => "The number one",
  (v= "hello") => "A greeting",
  (v= undefined) => "An undefined value",
  (v= null) => "A null value",
  (v= true) => "The true boolean",
  (v= NaN) => "Not a number"
)

getValue(1) //returns "The number one"
getValue("hello") //returns "A greeting"
getValue(parseInt("lala")) //returns "Not a number"
getValue(2 == 2)//returns "The true boolean"
...  
```

* If no value matches, `MatchError` is thrown:
```javascript
const getNumberName = (value) =>  match (value) (
  (v= 1) => "one",
  (v= 2) => "two"
)

getNumberName(1) //returns "one"
getNumberName(5) //throws MatchError
```

* If more than one case-closures match, the first takes precedence:
```javascript
const getNumberName = (value) =>  match (value) (
  (v= 1) => "the first one",
  (v= 1) => "another one"
)

getNumberName(1) //returns "the first one"
```

### Matching and binding variables

The pattern for a variable is simply `(variableName)`

* A variable pattern always matches anything and binds the variable to the matching value
```javascript
const length = (array) =>  match (array) (
  (array) => array.length
)

length([1,2,3]) //returns 3
length("Hello!") //returns 6
```

* An annonymous variable (_) pattern always matches anything but doesn't bind the variable. It is usually used as a fallback case-closure

```javascript
const isVowel = (letter) =>  match (letter) (
  (v= 'A') => true,
  (v= 'E') => true,
  (v= 'I') => true,
  (v= 'O') => true,
  (v= 'U') => true,
   (_) => false
)

isVowel('I') //returns true
isVowel('R') //returns false
```
### Matching and Binding Class instances

The pattern for Classes is simply `(ClassName)` or `( variable = ClassName)` to bind the class instance

* We can match values according to their class:

```javascript
const hasPermission = (user) =>  match (user) (
  (Admin) => true,
  (FreeUser) => false,
  (PremiumUser) => false
)

hasPermission(new FreeUser()) //returns false
```
* We can match values according to their superclass:

```javascript
const readError = (user) =>  match (user) (
  (ReferenceError) => "Something was undeclared!",
  (Error) => "Other Error"
)

readError(new ReferenceError()) //returns "Something was undeclared!"
readError(new SyntaxError()) //returns "Other Error"
```
* We can bind to variables values that match to a class o superclass:

```javascript
try {
  x + 1
} catch(error){
  match (error) (
  (e = ReferenceError) => "Reference error:" + e.message,
  (Error) => "Other Error"
)

//As x hasn´t been declared, it returns "Reference Error: x is not defined"
```
* We can even bing to variables by ES2015 destructuring:

```javascript
try {
  x + 1
} catch(error){
  match (error) (
  ({ message } = ReferenceError) => "Reference error:" + message,
  (Error) => "Other Error"
)

//As x hasn´t been declared, it returns "Reference Error: x is not defined"
```

### Matching and Binding Array instances:

To simplify array handling, we provide specific Array matchers, based on ES2015 Array destructuring:

* We can match an empty or nonempty array:

```javascript
const sum = (array) =>  match (array) (
  ([x,...xs]) => x + sum(xs),
  ([]) => 0
)

sum([1,2,3]) // returns 6
```
