/*
PROBLEM 4: MEMOIZATION
Memoization is a programming technique which attempts to increase a function’s performance by caching its 
previously computed results. 
Write a function named “memoizedFetch” that will fetch data from api url passed as argument but if you 
call the same function again with the same url then will it return previously received result instead of fetching it again.
*/
let url ='https://api.agify.io/?name=meelad'
let cache ={};
let memoizedFetch = async (url)=>{

    if(url in cache)
    {   
        console.log("Accessing cache")
        return cache[url]
    }
    try{
        let response =await fetch(url);
        let data = await response.json();
        cache[url]=data;
        return data;
    }
    catch(e){
        throw e
    }
    
}

(async function (){
    console.log(await memoizedFetch(url));
    console.log(await memoizedFetch(url));
    console.log(await memoizedFetch(url));
    console.log(await memoizedFetch(url));
})()