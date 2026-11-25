import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar as BootstrapNavbar, Nav, Container, Button } from "react-bootstrap";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Blog Management
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse>
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/add-blog">
                  Add Blog
                </Nav.Link>

                <span className="text-white">{user.Name}</span>

                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;