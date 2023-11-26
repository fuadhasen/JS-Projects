import Nav from './nav'
import Home from './home'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Create from './create'
import Blogdetail from './Blogdetail'
import NotFound from './NotFound';
 
function App() {
  return (
    <Router>

    <div className="App">
    <Nav />
      <div className="content">
            <Switch>
               <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/create">
                  <Create />
                </Route>
                <Route path="/blogs/:id">
                  <Blogdetail/>
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
            </Switch>
      </div>
    </div>
    </Router>

  );
}

export default App;
