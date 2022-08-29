/*
PROBLEM 2: ARRAYS
Introduce a populate method in array class in a way such that you can call it:
Example:
$ const array = [‘google.com’, ‘facebook.com’’];
$ array.populate(); 
Calling the above method will populate the array by replacing the urls with actual results retrieved by calling the url using http call.
The method should be callable on any array instance but it should throw an exception if the array does not contain valid urls.
*/

const array = ['https://catfact.ninja/fact','https://api.coindesk.com/v1/bpi/currentprice.json','https://api.agify.io/?name=meelad'];

let populate = async function(){

    for(let i=0;i<this.length;i++){
        try{
            let response = await fetch(this[i]);
            let data = await response.json();
            this[i]=data;
        }
        catch(e)
        {
            throw e;
        } 
    }
    return this;
}

Array.prototype.populate=populate;

array.populate().then((arr)=>{
    console.log(arr)
}).catch((e)=>{
    console.log(e)
})