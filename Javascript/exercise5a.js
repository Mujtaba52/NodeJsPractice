
const result =[];
const array = ['https://catafact.ninja/fact','https://api.coindesk.com/v1/bpi/currentprice.json','https://api.agify.io/?name=meelad'];

const myfunction = async (array)=>{
    for(let i=0;i<array.length;i++){
        try{
            const res =await fetch(array[i]);
            const json = await res.json()
            result[i]=json;
        }
        catch(e){
            result[i]= "Data Not Found";
        }
    }
    return result
}

 myfunction(array).then((result)=>{
    console.log(result)
 })

