import {  useEffect, useState } from 'react'
import Blog from './bloglist'
import useFetch from './useFetch'

const Home = () => {
    // let name = 'mario';

    const {  blogs, isPend, error } = useFetch('http://localhost:8000/blogs');
    // console.log(blogs);
    return (  
        <div className="content">
        {error && <div>couldnt fetch</div>}
        {isPend && <div>Loading....</div>}
        {blogs && <Blog blogs={blogs} title = "Äll Blogs!"/>}
                       
        </div>
)
}
 
export default Home;