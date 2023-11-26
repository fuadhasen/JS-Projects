import { Link } from 'react-router-dom'
const Nav = () => {
    return ( 
        <div className="navbar">
            <h1>The Fula16 Blog</h1>
            <div className="links">
                 <Link to="/">Home</Link>
                 <Link to="/create">New Blog</Link>
            </div>
        </div>
     );
}
 
export default Nav;