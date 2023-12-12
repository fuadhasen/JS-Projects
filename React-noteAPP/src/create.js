import {useEffect, useState, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import Home from './home'
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faCut, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';




const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [options, setoption] = useState([]);
    const [emoji, setEmoji] = useState(false);
    const [content, setcontent] = useState(null)
    const [isSelect, setSelect] = useState(false);

    const [isbold, setbold] = useState(false);
    const [isunder, setunderline] = useState(false);
    const myref = useRef();


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

    function handleAdd(e)
    {

            e.preventDefault();
            console.log('alen');
            fetch('http://localhost:8000/notes', {
                method: 'POST',
                headers: {'content-type': 'application/json'}, 
                body: JSON.stringify({
                    title: `${title}`,
                    body: `${body}`,
                    author: `${author}`
                })
             })
            .then((res) => {
                return res.json();
            })
            .then(() => {
                window.location.href = '/home';
            })
}

    // emoji handle
    function click(e){
        setEmoji(true)

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

            // const styledtext = document.createElement(command);
            // styledtext.appendChild(document.createTextNode(selectedTxt));
            const styledtext = `<${command}>${selectedTxt}</${command}>`

            const newText = bodyInput.textContent.slice(0, start)  + styledtext + bodyInput.textContent.slice(end);

            // range.insertNode(styledtext);
            if(styledtext){
                bodyInput.value = newText
                setcontent(newText);
                // bodyInput.focus();
            }}
        }
        function handleinput(e){
            // /setBody(myref.current.textContent);
            setBody(e.target.textContent);
        }

    return ( 
        <div className="form">
            <div className="child">
            <label>Note Title</label>
            <input type="text" className="inputs" 
                value={title}
                onChange= {(e) => {setTitle(e.target.value)}}
                placeholder="Type here...(or post emoji)"
                
            />

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
                ref={myref}         
                className="body"
                onMouseUp={() => selection()}  
                onSelect={() => selection()}  
                onInput={handleinput} 

                dangerouslySetInnerHTML={{ __html: content}}
                placeholder="Type here...(or post emoji)"

            ></div>
            <button className="btn1" onClick={(e) => click(e)}>😊</button>
                {emoji &&
                    (<div className="picker">
                        <Picker data={data}
                                onEmojiSelect={(e)=>{
                                    const bodyInput = myref.current;
                                    const selection = window.getSelection();
                                    const range = selection.getRangeAt(0);

                                    const start = range.startOffset;
                                    const end = range.endOffset;

                                    const newS = bodyInput.textContent.slice(0, start) + e.native + bodyInput.textContent.slice(end)
                                        
                                    setcontent(newS);
                                    setBody(newS);
                                    bodyInput.focus();
                                    setEmoji(false);
                                }}/>
                    </div>)
                }
            <label>Author</label>
            <select className="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            >
                {
                    options.map((opt) =>(
                        <option  value={opt.name} key={opt.name}>{opt.name}</option>
                    ))
                }  
            </select>
            <button className="btn2" onClick={(e) => handleAdd(e)}>Add Note</button>

        </div>
    </div> 

    );
}
 
export default Create;