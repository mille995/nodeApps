const add = require('./modules')

console.log(add(4,5))

const circle = require('./circle.js');
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);

const Square = require('./square.js');
const mySquare = new Square(2);
console.log(`the area of mySquare is ${mySquare.area()}`);


var myModule = require('./myModule');
var myModuleInstance = new myModule();
console.log(myModuleInstance.hello());
console.log(myModuleInstance.goodbye());
