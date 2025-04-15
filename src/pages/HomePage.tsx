import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import coasterCar from "../assets/credtracker.svg";
import hyperia from "../assets/hyperia.jpeg";
import vekoma from "../assets/vekoma.jpeg";
import queue from "../assets/queue.jpeg";

interface Coaster {
  name: string;
  rating: number;
}

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Watch for route changes
  const [coasters, setCreds] = useState<Coaster[]>([]);
  const [topCoaster, setTopCoaster] = useState<Coaster | null>(null);

  // Load creds and top coaster from localStorage
  const loadData = () => {
    const storedCreds = localStorage.getItem("creds");
    if (storedCreds) {
      setCreds(JSON.parse(storedCreds));
    }

    const loadData = () => {
      const storedTopCoaster = localStorage.getItem("topCoaster");
      if (storedTopCoaster) {
        const parsedTopCoaster = JSON.parse(storedTopCoaster);
        setTopCoaster(parsedTopCoaster);
      }
    };

    loadData();
  };

  useEffect(() => {
    loadData();
  }, [location]); // 👈 Update when returning to page

  // Optional: refresh if user clicks back or refocuses tab
  useEffect(() => {
    window.addEventListener("focus", loadData);
    return () => window.removeEventListener("focus", loadData);
  }, []);

  const currentCreds = coasters.length;
  const targetLevels = [5, 10, 25, 50, 100, 200, 250, 300, 400, 500];
  let nextTarget = 0;

  for (let i = 0; i < targetLevels.length; i++) {
    if (currentCreds < targetLevels[i]) {
      nextTarget = targetLevels[i];
      break;
    }
  }
  if (currentCreds >= 500) {
    nextTarget = Math.ceil(currentCreds / 100) * 100;
  }

  const fillPercentage = Math.min((currentCreds / nextTarget) * 100, 100);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Bebas Neue', sans-serif",
        color: "white",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ fontSize: "3rem", color: "black", margin: 0 }}>Creds</h1>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "60px",
          backgroundColor: "#222",
          border: "1px solid #444",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: `${fillPercentage}%`,
            height: "100%",
            backgroundColor: "darkslategrey",
            transition: "width 0.5s ease-in-out",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            color: "white",
            fontWeight: "bold",
            fontSize: "1.8rem",
            textAlign: "center",
          }}
        >
          {currentCreds} &nbsp;|&nbsp; 🎯 {nextTarget - currentCreds} until{" "}
          {nextTarget}
        </div>
        <img
          src={coasterCar}
          alt="Coaster Car"
          style={{
            position: "absolute",
            left: `calc(${fillPercentage}% - 30px)`,
            top: "90%",
            transform: "translateY(-50%)",
            width: "60px",
            height: "auto",
            zIndex: 3,
            filter: "invert(100%) brightness(1.5)",
            marginBottom: "-10px",
          }}
        />
      </div>

      {/* Feature Boxes */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Creds Added */}
        <div
          style={{
            ...cardStyle,
            backgroundImage: `url(${hyperia})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
          onClick={() => navigate("/home/add-creds")}
        >
          <div style={overlayStyle} />
          <div style={cardBodyStyle}>
            <div style={cardTitleStyle}>Creds Added</div>
            <div style={cardTextStyle}>
              <strong># {currentCreds}</strong>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/home/add-creds");
              }}
              style={cardLinkStyle}
            >
              Add More
            </div>
          </div>
        </div>

        {/* No1 Coaster */}
        <div
          style={{
            ...cardStyle,
            backgroundImage: `url(${vekoma})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
          onClick={() =>
            navigate("/home/rate-coasters", {
              state: {
                topCoaster: topCoaster || { name: "Top Pick", rating: 0 },
              },
            })
          }
        >
          <div style={overlayStyle} />
          <div style={cardBodyStyle}>
            <div style={cardTitleStyle}>No1 Coaster</div>
            <div style={cardTextStyle}>
              <strong>{topCoaster?.name || "No coaster selected"}</strong>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/home/rate-coasters", {
                  state: {
                    topCoaster: topCoaster || { name: "Top Pick", rating: 0 },
                  },
                });
              }}
              style={cardLinkStyle}
            >
              View Ratings
            </div>
          </div>
        </div>

        {/* Queue Times */}
        <div
          style={{
            ...cardStyle,
            backgroundImage: `url(${queue})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
          onClick={() => navigate("/queue-times")}
        >
          <div style={overlayStyle} />
          <div style={cardBodyStyle}>
            <div style={cardTitleStyle}>Queue Times</div>
            <div style={cardTextStyle}>
              <strong>Check Now</strong>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/queue-times");
              }}
              style={cardLinkStyle}
            >
              View Queue Times
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// === Style Objects for cards ===

const cardStyle: React.CSSProperties = {
  width: "100%",
  height: "120px",
  margin: "10px",
  backgroundColor: "#111",
  border: "1px solid #444",
  borderRadius: "15px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.2s",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: 1,
};

const cardBodyStyle: React.CSSProperties = {
  padding: "10px",
  color: "white",
  position: "relative",
  zIndex: 2,
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "2rem",
  marginBottom: "10px",
  color: "white",
};

const cardTextStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "10px",
};

const cardLinkStyle: React.CSSProperties = {
  color: "white",
  textDecoration: "underline",
  fontSize: "1rem",
  cursor: "pointer",
};

export default HomePage;
