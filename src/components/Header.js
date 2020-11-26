import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Header(props) {
  return (
    <Navbar className="navbar-expand-lg navbar-light bg-light">
      <Nav>
        <Nav.Item>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
export default Header;
