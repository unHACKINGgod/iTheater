//console.log('hello russia');

var name="david";
var number=6+8;

//console.log(name,number);
var methods=require('./data.js');
var add=methods.add(5,9);
var minus=methods.minus(5,9);
console.log(methods.add(add, minus));
console.log(methods.multi2(7,9,5));
console.log(methods.name);
console.log(methods.minus4(6));
console.log(methods.addition(4));
