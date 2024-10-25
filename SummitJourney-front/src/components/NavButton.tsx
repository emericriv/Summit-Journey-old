import React from "react";
import { Link } from "react-router-dom";
import { NavButtonProps } from "../model/PropsInterface";

const NavButton: React.FC<NavButtonProps> = ({ to, children }) => {
  return (
    <li className="nav-button mx-2">
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavButton;
