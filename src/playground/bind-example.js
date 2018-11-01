'use strict';

const obj = {
	name: 'Nick',
	getName() {
		return this.name;
	}
};

// works
console.log(obj.getName());

// loses 'this' context - doesn't work
const getNameA = obj.getName;
console.log(getNameA());

// transfers the 'this' context to the function - works
const getNameB = obj.getName.bind(obj);
console.log(getNameB());
