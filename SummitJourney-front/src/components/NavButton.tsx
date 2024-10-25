import React from "react";
import { Link } from "react-router-dom";
import { NavButtonProps } from "../model/PropsInterface";

const NavButton: React.FC<NavButtonProps> = ({ to, children }) => {
  return (
    <li>
      <Link to={to} className="nav-link" id="home-tab">
        {children}
      </Link>
    </li>
  );
};

export default NavButton;
