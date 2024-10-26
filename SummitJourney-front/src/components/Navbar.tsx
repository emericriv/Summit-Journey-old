import { Link } from "react-router-dom";
import NavButton from "./NavButton";
import { useEffect, useRef, useState } from "react";

const Navbar: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>("home");
  const navRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

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

  return (
    <nav className="sticky-top nav-bar" ref={navRef}>
      <div className="container-fluid p-2 navbar-div d-flex align-items-center justify-content-between">
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
          <NavButton
            to="/"
            isActive={activeButton === "home"}
            onClick={() => handleButtonClick("home")}
          >
            Accueil
          </NavButton>
          <NavButton
            to="/session"
            isActive={activeButton === "session"}
            onClick={() => handleButtonClick("session")}
          >
            Nouvelle session
          </NavButton>
          <NavButton
            to="/locations"
            isActive={activeButton === "locations"}
            onClick={() => handleButtonClick("locations")}
          >
            Où grimper ?
          </NavButton>
          <NavButton
            to="/profile"
            isActive={activeButton === "profile"}
            onClick={() => handleButtonClick("profile")}
          >
            Profil
          </NavButton>
        </ul>
        <div className="mobile px-2 me-2" onClick={handleClick}>
          <i className={`bar ${clicked ? "bi bi-x" : "bi bi-list"}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
