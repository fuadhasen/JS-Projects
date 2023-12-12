import {useState, useEffect, } from 'react'
import useFetch from './useFetch'
import {Link, useParams, Routes, Route} from 'react-router-dom'
import Error from './Error'
import Create from './create'
import Detail from './Detail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faCut, faItalic, faUnderline, faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
    // const [note, setNote] = useState([]);
    const {note} = useFetch('http://localhost:8000/notes');
    const {id} = useParams();
    const [isadd, setadd] = useState(false)

    // const [rev] = note.reverse();
    
    // console.log(note);
    // note.reverse();

    return (
        <div className="home-notes">
            <div className="side">
                <div className="add">
                    <h2>Notes</h2>
                    <Link to="/home/create"><FontAwesomeIcon icon={faEdit}/></Link>
                </div>
                <div className="note">
                    <div className="home-list">
                        {note.map((not) => (
                        
                            <div key={not.id} className='indvlist'>
                                <Link to={`/home/note/${not.id}`}> <h3>{not.title}</h3></Link>
                                <p>written by {not.author}</p>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="main">
                <Routes>
                    <Route path='/' element={<h1 className='react-display'>NOTE DISPLAY</h1>}></Route>
                    <Route path='/create' element={<Create />}></Route>
                    <Route path='/note/:id' element={<Detail />}></Route>
                </Routes>
            </div>
        </div>

     );
}
 
export default Home;