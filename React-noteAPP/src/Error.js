import {Link} from 'react-router-dom'
const Error = () => {
    return (
        <div className="error">
            <h2>Sorry</h2>
            <p>page is not found</p>
            <Link to="/home"> Go To Home Page</Link>
        </div> 

     );
}
 
export default Error;