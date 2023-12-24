import {useParams, Redirect} from 'react-router-dom'
import useFetch from './useFetch'
import { useEffect, useState,useRef } from 'react';
import Error from './Error'
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faCut, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';



const Detail = () => {
    const {id} = useParams();
    const {note} = useFetch(`http://localhost:8000/notes/${id}`);
    console.log(note);
    const [title, setTitel] = useState('')
    const [body, setbody] = useState('')
    const [author, setauthor] = useState('')
    const [editMode, setEdit] = useState(false);
    const [options, setoption] = useState([]);
    const [content, setcontent] = useState(null)
    const [isSelect, setSelect] = useState(false);
    const myref = useRef();

    const [emoji, setEmoji] = useState(false);

    function click(){
        setEmoji(true);
    }

    useEffect(()=>{
        setTitel(note.title);
        setbody(note.body);
        setauthor(note.author);

    }, [note]);
    // author fetch\
    useEffect(() => {
        fetch(`http://localhost:8000/author/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
                setoption(data);
            })
    // when first mount
    }, [])

    function handledelete(){
        fetch(`http://localhost:8000/notes/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            window.location.href = '/home';
        })
    }
    function handleupdate(e){
        e.preventDefault();

        fetch(`http://localhost:8000/notes/${id}`, {
            method: 'PATCH',
            headers: {'content-type': 'Application/json'},
            body: JSON.stringify({
                title: `${title}`,
                author: `${author}`,
                body: `${body}`
            })
        })
        .then(() =>{
            setEdit(false)
        })
}

    function selection(){

        const select = window.getSelection();
        const selectText = select.toString();
        setSelect(selectText.length > 0);  
    }
    function handleformat(command){     
      if(command === 'cut'){
        document.execCommand(command, false, null);
     }
     else{
        const select = window.getSelection();
        const range = select.getRangeAt(0);

        const bodyInput = myref.current;           
        const start = range.startOffset;
        const end = range.endOffset;
    

        const selectedTxt = bodyInput.textContent.substring(start, end);
        const styledtext = `<${command}>${selectedTxt}</${command}>`

        const newText = bodyInput.textContent.slice(0, start)  + styledtext + bodyInput.textContent.slice(end);

        // range.insertNode(styledtext);
        if(styledtext){
            bodyInput.value = newText
            setbody(newText);
            // bodyInput.focus();
        }}
    }
    function handleInput(e){
        // setcontent(body);
        setbody(e.target.textContent);

    }
    function handleupdatebutton(){
        setcontent(body)
        setEdit(true);
    }
    return ( 
    <div className="note-detail">
        {editMode ? 
            <div className="form-new">
                <label>Note Title</label>
                <input type="text" className="inputs" 
                    value={title}
                    onChange= {(e) => {setTitel(e.target.value)}}
                />
                <button className="btn1" onClick={(e) => click(e)}>😊</button>
                 {emoji &&
                     (<div className="picker">
                        <Picker data={data}
                             previewPosition="none"
                             onEmojiSelect={(e)=>{
                                const bodyInput = myref.current;
                                const selection = window.getSelection();
                                const range = selection.getRangeAt(0);

                                const start = range.startOffset;
                                const end = range.endOffset;

                                const newS = bodyInput.textContent.slice(0, start) + e.native + bodyInput.textContent.slice(end)
                                    
                                setcontent(newS);
                                setbody(newS);
                                bodyInput.focus();
                                setEmoji(false);
                        }}/>
                    </div>)
                }
                {isSelect && (
                    <div className="butns">
                        <button onClick={() => handleformat('strong')}>
                            <FontAwesomeIcon icon={faBold}/>
                        </button>
                        <button onClick={() => handleformat('cut')}>
                            <FontAwesomeIcon icon={faCut}/>
                        </button>
                        <button onClick={() => handleformat('i')}>
                            <FontAwesomeIcon icon={faItalic}/>
                        </button>
                    </div>
                 )}
                <label>Note Body</label>
                <div
                    contentEditable
                    onSelect={() => selection()}
                    ref={myref}
                    className="body"
                    onInput={handleInput}
                    
                    dangerouslySetInnerHTML={{__html: content}}
                    placeholder="Edit here...(or post emoji)"

                ></div>
                <label>Author</label>
                <select   
                    className="author"
                    value={author}
                    onChange={(e) => setauthor(e.target.value)}

                >
                {/* options */}
                {
                   options.map((opt) =>(
                        <option key={opt.id} value={opt.name}>{opt.name}</option>
                   )) 
                }
                 </select>
                <button className="btn2" onClick={(e) =>  handleupdate(e)}>Edite Note</button>
               
            </div> :  
                <div className="disc">
                    <div className="btnall">
                        <button className="btn btn-secondary" onClick={()=>handleupdatebutton() }>update Note</button>
                        <button id="update"onClick={()=> handledelete()}>Delete Note</button>
                    </div>
                    <h2>{title}</h2>
                    <p> written by {author}</p>
                    <div className='detail-body'>{body}</div>
                </div>
        }
    </div>
    );
}
 

 
export default Detail;