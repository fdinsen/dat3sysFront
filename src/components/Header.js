import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './Login';

function Header(props) {
  return (
    <Router>

      <Navbar className="navbar-expand-lg navbar-light bg-light">
        <Nav>
          <Nav.Item>
            <NavLink to="/home" className="nav-link">
              Home
          </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Switch>
        
        <Route path="/login">
          <Login setLoggedIn = {props.setLoggedIn} loggedIn={props.loggedIn}/>
        </Route>
        <Route path="/home">
          
        </Route>
      </Switch>


    </Router>
  );
}
export default Header;
