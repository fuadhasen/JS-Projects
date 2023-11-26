import {Link} from 'react-router-dom'

const Blog = ({blogs, title}) => {
   

    // console.log(blogs);
  
    return ( 
        <div className="list">
            <h2>{title}</h2>
            {/* when u try to implement js logic on rendering u gotta use brace */}
            {blogs.map((blog) => (
           
            <div className="bld" key = {blog.id}>
               <Link to={`/blogs/${blog.id}`}>
               <h2>{blog.title}</h2>
                <p>Written By {blog.author}</p>              
               </Link>

          </div>
    ))}
    </div>

    )
    
 }
 
export default Blog;