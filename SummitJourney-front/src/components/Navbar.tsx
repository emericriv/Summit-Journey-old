import { Link } from "react-router-dom";
import NavButton from "./NavButton";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="sticky-top nav-bar">
      <div className="container-fluid p-2 navbar-div d-flex align-items-center justify-content-between">
        <Link to="/" className="brand d-flex align-items-end ">
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
          <NavButton to="/">Accueil</NavButton>
          <NavButton to="/session">Nouvelle session</NavButton>
          <NavButton to="/locations">Où grimper ?</NavButton>
          <NavButton to="/profile">Profil</NavButton>
        </ul>
        <div className="mobile" onClick={handleClick}>
          <i className={`bar ${clicked ? "bi bi-x" : "bi bi-list"}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
