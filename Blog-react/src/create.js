import { useState } from 'react'
import {useHistory} from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('ked mern');
    const [ispending, setpend] = useState(false);
    const history = useHistory();

    function handlsubmit(e){
        e.preventDefault();
        const blogs = {title, body, author};
        

        setpend(true)
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(blogs)
        })
        .then((res) =>{
            console.log(res)
            return res.json()
        })
        .then((data) => {
            console.log(data);
            setpend(true);
            // history.go(-1);
            history.push('/')
        })
    }
    return (  
        <div className="create">
            <h2>Add some blogs</h2>
            <form onSubmit={handlsubmit}>
                <label>Blog title</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    
                 />
                 <label>Blog Body</label>
                 <textarea
                    required 
                    value={body}
                    onChange={(e) => setBody(e.target.value)} 
                ></textarea>
                 <label>Blog author</label>
                 <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}

                >
                    <option>Ked mern</option>
                    <option>abdire jamie</option>
                 </select>
                 {!ispending && < button>Add Button</button>}
                 {ispending && < button disabled>Adding blog..</button>}

                 {/* <p>{body}</p> */}
            </form>
        </div>
    );
}
 
export default Create;