import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AddCredsPage from "./pages/AddCredsPage";
import RateCoastersPage from "./pages/RateCoastersPage";
import QueueTimesPage from "./pages/QueueTimesPage";

// Import the background image
import backgroundImage from './assets/background.png';

const pageVariants = {
  initial: { x: "100vw", opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: "-100vw", opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <LandingPage />
            </motion.div>
          }
        />
        <Route
          path="/home"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Layout />
            </motion.div>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="add-creds" element={<AddCredsPage />} />
          <Route path="rate-coasters" element={<RateCoastersPage />} />
          <Route path="queue-times" element={<QueueTimesPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <div
        style={{
          background: `url(${backgroundImage}) no-repeat center center fixed`,
          backgroundSize: "cover",
          minHeight: "100vh", // Make sure the background covers the entire viewport
        }}
      >
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
