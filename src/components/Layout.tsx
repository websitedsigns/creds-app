// src/components/Layout.tsx
import { Container } from 'react-bootstrap';
import BottomNav from './BottomNav';
import { Outlet } from 'react-router-dom';
import DropDown from './DropDown';

const Layout = () => {
  return (
    <>
      <Container className="pb-5"> {/* Leave space for nav bar */}
        <Outlet /> {/* Render page-specific content here */}
      </Container>
      <DropDown />
      {/* Bottom navigation bar */}
      <BottomNav />
    </>
  );
};

export default Layout;
