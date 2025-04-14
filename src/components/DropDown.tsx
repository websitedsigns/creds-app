import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { FaBars, FaCog } from 'react-icons/fa'; // For the burger and settings icons
import logo from '../assets/credsnobg.png'; // Replace with your actual logo file

const DropDown = () => {
  const [expanded, setExpanded] = useState(false);
  const [creds, setCreds] = useState<number>(0); // Store creds as a number

  const handleToggle = () => setExpanded(!expanded);
  const handleCollapse = () => setExpanded(false);

  useEffect(() => {
    const storedCreds = localStorage.getItem('creds');
    if (storedCreds) {
      setCreds(JSON.parse(storedCreds).length); // Assuming creds are stored as an array
    }
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      bg="light"
      variant="dark"
      className="justify-content-between px-3 py-2"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="/home" className="d-flex align-items-center">
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          <span style={{ color: 'black' }}>CREDS</span>
        </Navbar.Brand>

        {/* Hamburger Menu (Visible on mobile) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}>
          <FaBars size={24} style={{ color: 'black' }} />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav" in={expanded} onExit={handleCollapse}>
          <Nav className="ml-auto">
            <NavLink to="/home" className="nav-link" onClick={handleCollapse} style={{ color: 'black' }}>
              Home
            </NavLink>
            <NavLink to="/home/add-creds" className="nav-link" onClick={handleCollapse} style={{ color: 'black' }}>
              Creds
            </NavLink>
            <NavLink to="/home/rate-coasters" className="nav-link" onClick={handleCollapse} style={{ color: 'black' }}>
              Top 10
            </NavLink>
            <NavLink to="/home/queue-times" className="nav-link" onClick={handleCollapse} style={{ color: 'black' }}>
              Queue
            </NavLink>

            {/* Display creds */}
            <div className="nav-item">
              <span style={{ color: 'black', fontWeight: 'bold', paddingTop: '8px' }}>
            Creds: {creds}
              </span>
            </div>

            {/* Dropdown for Settings */}
            <Dropdown id="settings-dropdown" align="end">
              <Dropdown.Toggle as="span" className="dropdown-toggle" style={{ color: 'black' }}>
            <FaCog />
              </Dropdown.Toggle>
              <Dropdown.Item as={NavLink} to="/settings" onClick={handleCollapse} style={{ color: 'black' }}>
            Settings
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/settings" onClick={handleCollapse} style={{ color: 'black' }}>
            <div className="d-flex align-items-center">
                <span style={{ marginRight: '8px' }}>Dark Mode</span>
                <label className="switch">
                    <input
                        type="toggle"
                        onChange={(e) => {
                            const isDarkMode = e.target.checked;
                            document.body.classList.toggle('dark-mode', isDarkMode);
                            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
                        }}
                        defaultChecked={localStorage.getItem('darkMode') === 'enabled'}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
              </Dropdown.Item>

              <Dropdown.Item as={NavLink} to="/settings" onClick={handleCollapse} style={{ color: 'black' }}>
            Log In/Out
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DropDown;
