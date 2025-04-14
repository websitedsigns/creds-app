import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();
  const [startSlideOut, setStartSlideOut] = useState(false);

  useEffect(() => {
    // After 2 seconds, trigger the slide-out animation
    const timer = setTimeout(() => {
      setStartSlideOut(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Once slide-out starts, navigate after animation finishes
  useEffect(() => {
    if (startSlideOut) {
      const navTimer = setTimeout(() => {
        navigate('/home');
      }, 500); // match the slide-out duration
      return () => clearTimeout(navTimer);
    }
  }, [startSlideOut, navigate]);

  return (
    <motion.div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        backgroundColor: 'darkslategrey',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={!startSlideOut ? { opacity: 1 } : { x: '-100%', opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
  src={logo}
  alt="CREDS Logo"
  style={{
    width: '150px',
    height: 'auto',
    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
  }}
/>

    </motion.div>
  );
};

export default LandingPage;
