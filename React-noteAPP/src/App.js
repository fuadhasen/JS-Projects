import {BrowserRouter as Router,  Routes, Route, useParams } from 'react-router-dom'

import './note.css'
import Nav from './nav'
import Home from './home'
import Error from './Error'
import Create from './create'
import Detail from './Detail'
import useFetch from './useFetch'
import image from './Udemy thumbnail.jpg'

const App = () => {
    // const { id } = useParams();
    // const {note} = useFetch(`http://localhost:8000/notes`);
    
    return ( 
    <Router>  
        <div className="all">
            {/* in shiete u can add the nav  */}
            {/* <Nav /> */}
            <div className="home">
                <Routes> 
                    {/* make nested routing */}
                    <Route path="/" element={<div className="welcome"><h1 className="welcome-heading">React Notes App!</h1>
                                                    <img src={image} alt="" /></div>}/>
                    <Route  path="/home/*" element={<Home />}/>
                    {/* <Route path="/create" element={<Create />}></Route> 
                    
                    <Route path="/note/:id" element={<Detail />}></Route>  */}
                    {/* /* <Route path="*" element={<Error />} />                  */}
                </Routes>
            </div>
        </div>
    </Router>
  );
}
 
export default App;