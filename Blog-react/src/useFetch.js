import { useEffect, useState } from "react";

const useFetch = (url) => {


    const [blogs, setBlogs] = useState(null);
    const [isPend, setPend] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() =>{
        const abortcont = new AbortController();
        setTimeout(() => {
        fetch(url, { signal: abortcont.signal})
        // first promise get the content but the response may contain many thing so just get json data only
        .then(res =>{
            if(!res.ok){
                // console.log(ress.status);
                throw Error(
                    'could fetch the request'
                )
            }
            return res.json();
        })
        // get the parsed json data as javascript object data
        .then(data =>{
            // console.log(data);
            if(data !== null){
            setBlogs(data);
            setPend(false);
            setError(null);
            }
            else{
                // console.log('null recieved')
            }
        })
        .catch(err => {
            if(err.message == 'AbortControl'){
                console.log('fetch aborted');

            }
            else{
                setPend(false);
                setError(err); 

            }
           
        })
    }, 1000);
    return () => 
        abortcont.abort();
   
        
    }, [url]);
    return   {blogs, error, isPend}
}

 
export default useFetch;