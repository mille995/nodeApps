// define the Person Class
function Person() {}
Person.prototype.walk = function(){
    	console.log ('I am walking!');
};
// define the Student class
function Student() {
	// Call the parent constructor
	Person.call(this);
}
// inherit Person
Student.prototype = Object.create(Person.prototype);
Student.prototype.walk = function(){
    	console.log ('I am walking to class!');
};
