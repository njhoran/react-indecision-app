const user = {
	name: 'Nick',
	cities: ['Cardiff', 'Portsmouth'],
	printPlacesLived () {
		return this.cities.map(city => `${this.name} has lived in ${city}`);
	}
};

console.log( user.printPlacesLived() );

const multiplier = {
	numbers    : [1, 2, 3],
	multiplyBy : 2,
	multiply () {
		return this.numbers.map(number => number * this.multiplyBy);
	}
};

console.log(multiplier.multiply());