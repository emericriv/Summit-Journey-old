import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import NavButton from "./NavButton";

const Navbar: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  // Change clicked state for the collapse menu
  const handleClick = () => {
    setClicked(!clicked);
  };

  // Close the collapse menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Reset the clicked state when resizing the window to desktop format
  const handleResize = () => {
    if (window.innerWidth > 769) {
      setClicked(false);
    }
  };

  // Add event listener to the window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* overlay to darken the site when navbar is displayed on mobile format */}
      {clicked && (
        <div className="overlay" onClick={() => setClicked(false)}></div>
      )}
      <nav className="sticky-top nav-bar" ref={navRef}>
        <div className="container-fluid p-2 navbar-div global-appearance d-flex align-items-center justify-content-between">
          <Link to="/" className="brand d-flex align-items-end">
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              xmlns="http://www.w3.org/2000/svg"
              className="me-2 SummitJourney-logo"
            >
              <polygon
                points="5,135 105,135 55,10"
                strokeWidth="5"
                fill="none"
                stroke="currentColor"
              />
              <polyline
                points="82,80 100,44 135,135 105,135"
                strokeWidth="5"
                fill="none"
                stroke="currentColor"
              />
            </svg>
            Summit Journey
          </Link>
          <ul
            className={`d-flex flex-md-row flex-column justify-content-start align-items-start justify-content-md-center align-items-md-center pe-3 list-unstyled
            ${clicked ? "active" : ""}
            `}
          >
            <NavButton to="/" isActive={location.pathname === "/"}>
              Accueil
            </NavButton>
            <NavButton
              to="/session"
              isActive={location.pathname === "/session"}
            >
              Nouvelle session
            </NavButton>
            <NavButton
              to="/locations"
              isActive={location.pathname === "/locations"}
            >
              Où grimper ?
            </NavButton>
            <NavButton
              to="/profile"
              isActive={location.pathname === "/profile"}
            >
              Profil
            </NavButton>
            <NavButton to="/login" isActive={location.pathname === "/login"}>
              Login
            </NavButton>
          </ul>
          <div className="mobile" onClick={handleClick}>
            <i
              className={`bar px-2 py-1 me-2 ${
                clicked ? "bi bi-x" : "bi bi-list"
              }`}
            ></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
