// new
// synchronous - this will display A B C D
console.log("A")
console.log("B");
console.log("C");
console.log("D");

//new 
//asynchronous - this will display A B D C
console.log("A")
console.log("B");
setTimeout(function(){console.log("C")});
console.log("D");

//new
//callback
var myCallback = function(){
    console.log("I am done");
}

function goGetData(cb){
    console.log ("I'm getting data");
    setTimeout(()=> {cb()}, 2000);
}

goGetData(myCallback);
    