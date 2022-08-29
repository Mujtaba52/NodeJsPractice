/*PROBLEM 1: FUNCTIONS
Write a function that can sum any number of arguments. The prototype of the function is given below:
sum(1,2);
sum(1,2,3);
sum(1,2,3,4); … and so on any number of arguments.
Function will return the sum of all the passed arguments.
*/

let sum =(...args)=>{
    return args.reduce((result,arg)=>{
        return result+=arg
    },0)
}

console.log(sum(1,2,3,4));