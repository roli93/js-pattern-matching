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

JS-Pattern-Matching leverages ES2015 syntax to make more readable and easy-to-use code. Therefore, it can only be run in ES2015-supporting environments (Node 4 or above)

##Babel

Currently Babel is not supported by JS-Pattern-Matching. We are working hard to bring support for it as soon as possible.

If you still want to use JS-Pattern-Matching, you can use it inside a separate file and later tell Babel to ignore that file by adding the following entry to you `.babelrc` file:

```javascript 
{
  "ignore": ["file-using-js-pattern-matching.js"]
}
``` 
Using JS-Pattern-Matching
====================
We import the powerful `match` function by doing

```javascript 
var match = require('js-pattern-matching');
``` 
### General Syntax

The syntax always is of the form:
```
match (valueToMatch)(
 listOfCommaSeparatedClosures
)
```

Each closure has to be a valid ES2015 closure and is itself of the form `(pattern) => closureBody`

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















