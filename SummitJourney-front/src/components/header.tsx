import { Link } from "react-router-dom";
import NavButton from "./NavButton";

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid p-2 navbar-div">
        <Link to="/" className="navbar-brand d-flex align-items-end">
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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvasLg"
          aria-controls="navbarOffcanvasLg"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          id="navbarOffcanvasLg"
          aria-labelledby="navbarOffcanvasLgLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Summit Journey
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="nav nav-pills navbar-nav justify-content-end flex-grow-1 pe-3">
              <NavButton to="/">Accueil</NavButton>
              <NavButton to="/session">Nouvelle session</NavButton>
              <NavButton to="/locations">Où grimper ?</NavButton>
              <NavButton to="/profile">Profil</NavButton>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
