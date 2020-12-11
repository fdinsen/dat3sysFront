import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import { useEffect, useState } from 'react';
import facade from '../apiFacade';


function Header(props) {
  const [user, setUser] = useState(null);

  useEffect(e => {
    console.log(facade.getUser());
    if (facade.getUser() && !user) {
      setUser(facade.getUser());
    }
  })

  function logout() {
    facade.logout();
    setUser(null);
  }

  return (
    <Router>

      <Navbar className="navbar-expand-lg navbar-light bg-light">
        <Nav>
          <Nav.Item>
            <NavLink to="/home" className="nav-link">
              Home
          </NavLink>
        </Nav.Item>

        {user ? (
          <>
            <Nav.Item>
              <NavLink to="/" className="nav-link">
                {user.username}
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/" className="nav-link" onClick={logout}>
                Logout
              </NavLink>
            </Nav.Item>
          </>
        ) :
          (
            <>
              <Nav.Item>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </Nav.Item>
            </>
          )}
      </Nav>
    </Navbar>
  );
}
export default Header;
