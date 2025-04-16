import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { FaBars, FaCog } from "react-icons/fa";
import logo from "../assets/credsnobg.png";
import SettingsModal from "../Modals/SettingsModal"; // ✅ Make sure this path matches your actual file

const DropDown = () => {
  const [creds, setCreds] = useState<number>(0);
  const [showSettings, setShowSettings] = useState(false); // ✅ Modal visibility

  useEffect(() => {
    const storedCreds = localStorage.getItem("creds");
    if (storedCreds) {
      setCreds(JSON.parse(storedCreds).length);
    }

    const isDarkMode = localStorage.getItem("darkMode") === "enabled";
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, []);

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        bg="light"
        variant="light"
        className="px-3 py-2 shadow-sm"
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand
            as={NavLink}
            to="/home"
            className="d-flex align-items-center"
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <span className="fw-bold">CREDS</span>
          </Navbar.Brand>

          {/* Hamburger menu */}
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FaBars size={24} />
          </Navbar.Toggle>

          {/* Collapsible Nav */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <NavLink to="/home" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/home/add-creds" className="nav-link">
                Creds
              </NavLink>
              <NavLink to="/home/rate-coasters" className="nav-link">
                Top 10
              </NavLink>
              <NavLink to="/home/queue-times" className="nav-link">
                Queue
              </NavLink>

              {/* Creds Display */}
              <span className="nav-link fw-bold">Creds: {creds}</span>

              {/* Dropdown for Settings */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-settings"
                  className="d-flex align-items-center"
                >
                  <FaCog />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setShowSettings(true)}>
                    Settings
                  </Dropdown.Item>

                  

                  <Dropdown.Item as={NavLink} to="/settings">
                    Log In/Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Settings Modal */}
      <SettingsModal show={showSettings} onHide={() => setShowSettings(false)} />
    </>
  );
};

export default DropDown;
