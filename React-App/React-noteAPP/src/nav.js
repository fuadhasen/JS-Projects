import {Link} from 'react-router-dom'

const Nav = () => {


    return ( 
        <div className="navs">
            <h1>Notes</h1>
            <div className="nav-list">
                {/* <Link to="/home"></Link>   */}
                <Link to="/"><strong>Home</strong></Link>

                <Link to="/home"><strong>Notes</strong></Link>
                {/* <Link to="/create">Add Notes</Link> */}
            </div>
        </div>
     );
}
 
export default Nav;