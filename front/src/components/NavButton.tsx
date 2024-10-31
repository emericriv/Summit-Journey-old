import React from "react";
import { Link } from "react-router-dom";
import { NavButtonProps } from "../models/PropsInterface";

const NavButton: React.FC<NavButtonProps> = ({ to, children, isActive }) => {
  return (
    <li className={`nav-button mx-2 ${isActive ? "active" : ""}`}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavButton;
