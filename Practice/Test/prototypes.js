// define the Person Class
function Person(first, last, age, eyecolor) {
this.firstName = first;
this.lastName = last;
this.age = age;
this.eyeColor = eyecolor;
this.nationality = "English";
}

let person = new Person;

// define the Person Class
function Person() {}
Person.prototype.walk = function(){
    	console.log ('I am walking!');
};

console.log(person.walk);

let student = new Student()

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

Person.prototype.name = function() {
    return this.firstName + " " + this.lastName;
    };

Person.prototype.walk = function(){
        	console.log ('I am walking!');
    };
    
Array.prototype.sumEven = function(){
    let total = 0;
    this.forEach(item => {
        if(item % 2 === 0) {
            total += item;
        }
    });
    return total;
}

let myArray = [1, 24, 2, 35];

let myTotal = myArray.sumEven();

console.log(myTotal);