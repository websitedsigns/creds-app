import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const navLinkStyle: React.CSSProperties = {
  padding: '10px 15px',
  margin: '0 10px',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#ccc',
  textDecoration: 'none',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const BottomNav = () => {
  return (
    <Navbar
      fixed="bottom"
      bg="dark"
      variant="dark"
      className="justify-content-around border-0"
      style={{
        padding: '1px 0',
        borderRadius: '15px 15px 0 0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        zIndex: '1000', // Ensure it stays on top of other content
      }}
    >
      <Nav>
        <NavLink 
          to="/home" 
          className="nav-link" 
          style={navLinkStyle}
        >
          Home
        </NavLink>
        <NavLink 
          to="/home/add-creds" 
          className="nav-link" 
          style={navLinkStyle}
        >
          Creds
        </NavLink>
        <NavLink 
          to="/home/rate-coasters" 
          className="nav-link" 
          style={navLinkStyle}
        >
          Top 10
        </NavLink>
        
        <NavLink 
          to="/home/queue-times" 
          className="nav-link" 
          style={navLinkStyle}
        >
          Queues
        </NavLink>
       
        
      </Nav>
    </Navbar>
  );
};

export default BottomNav;
