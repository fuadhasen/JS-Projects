import React from 'react'
import {Routes, Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Home from './Home'


const App = () => {

    return ( 
        // <Router >
            <div className="all">
                <Home />
            </div>
        // </Router> 

    );
}
 
export default App;