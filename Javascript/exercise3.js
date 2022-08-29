/*
PROBLEM 3: CLOSURES
Write a function to sum the arguments based on below prototype:
sum(1)(2)(3);

Make this function generic:
sum(1)(2)(3).....(n);
*/


const Sum = function (a) {
    return function (b) {
        return b ? Sum(a + b) : a;
    }
};
function add2(a,b)
{
    return a+b;
}
//console.log(add2(2,1))

console.log(Sum(2)(3)(2)(5)(5)(8)())