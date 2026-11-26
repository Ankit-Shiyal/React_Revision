
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
} from "react-bootstrap";
import "./Navbar.css";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BootstrapNavbar
      className="custom-navbar"
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-logo">
          <span className="brand-icon">B</span>
          BlogSpace
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === "/"}
            >
              Home
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/add-blog">
                  Add Blog
                </Nav.Link>

                <Nav.Link as={Link} to="/my-blogs">
                  My Blogs
                </Nav.Link>

                <span className="user-name">
                  {user.Name}
                </span>

                <Button
                  variant="outline-light"
                  className="logout-btn"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Link to="/register" className="register-btn">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
