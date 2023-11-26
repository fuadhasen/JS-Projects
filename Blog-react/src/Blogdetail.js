import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from './useFetch';

const BlogDetail = () => {
    const {id} = useParams();
    const { blogs, ispend, error} = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    function handledelete(){
        fetch('http://localhost:8000/blogs/' + blogs.id, {
           method: 'DELETE'
        })
        .then(() => {
            history.push('/');
        })
    }
    // console.log(blogs);
    return ( 
        <div className="blogdetail">
            {/* <h2>Blog Detail - {id}</h2> */}
            {ispend && <div>Loading...</div>}
            {/* {error && <div>{error}</div>} */}
            {blogs && (
                <article>
                 <h2> {blogs.title} </h2>
                 <p>Written by {blogs.author} </p>
                 <div>{blogs.body}</div>
                 <button onClick={handledelete}>Delete</button>

                </article>
            )}
            
        </div>
     );
}
 
export default BlogDetail;