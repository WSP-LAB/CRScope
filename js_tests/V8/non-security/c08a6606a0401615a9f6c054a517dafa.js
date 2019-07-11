function myOtherModNeg2ToThe31(b) {
    return -2147483648 % b;
}

for (var i = 0; i < 200; ++i) {
	myOtherModNeg2ToThe31(-1);
}

