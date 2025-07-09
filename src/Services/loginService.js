export const LoginProcess=(url,username,password)=>{
    const data={
        username,
        password
    }
    const options={
        method:'POST',
        body: JSON.stringify(data),
    }
    async function fetchDetails(){
        try{
            const fetchedData = await fetch(url,options);
            const response = await fetchedData.json();
            return response;
        }catch(error){
            console.log({error});
            return error
        }
        
    }
    return fetchDetails();
}