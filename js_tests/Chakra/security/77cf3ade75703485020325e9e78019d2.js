let a = [0];
let b = [0];
b.__defineGetter__(Symbol.isConcatSpreadable, () => {
    b[0] = 1.2;
    return true;
});
 
let res = a.concat(b, 0x1234);
print(res);

