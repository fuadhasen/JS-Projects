import {useEffect, useState} from 'react'
const useFetch = (url) => {
    const [note, setnote] = useState([]);

    useEffect(() => {
    
        fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            if(data.length > 1){
                const rev = data.reverse();
                setnote(rev);  
            }
            else{
                setnote(data);              
            }
            // console.log({rev})
        });
    
    }, [url])
     
    // let rev = note.reverse();
    return { note }
}
 
export default useFetch;