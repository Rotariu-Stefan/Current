const tenToTwo = (nr10) => {
	if (nr10 === 0)
		return 0;

	rez = 0;
	while (nr10 > 0) {
		power = 0;

		while (Math.pow(2, power) <= nr10)
			power++;

		console.log("NR10:", nr10, "REZ:", rez, "M:", Math.pow(10, power - 1));

		rez += Math.pow(10, power - 1);
		nr10 -= Math.pow(2, power - 1);
	}
	return rez;
}

const twoToTen = (nr2) => {
	if (nr2 === 0)
		return 0;

	rez = 0;
	digits = 0;

	while (nr2 > 0) {
		rez += (nr2 % 10) * Math.pow(2, digits);
		nr2 = (nr2 / 10).toFixed();
		digits++;
	}
	return rez;
}

//console.log(twoToTen(1010001100011));
console.log(tenToTwo(99999));
console.log(11000011010011110 + 1);