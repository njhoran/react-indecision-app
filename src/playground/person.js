'use strict';

const isAdult  = (age) => age && age >= 18;
const canDrink = (age) => age && age >= 21;

export default (age) => age && age >= 65;

export { isAdult, canDrink };
