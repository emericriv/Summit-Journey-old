import React from "react";
import { Link } from "react-router-dom";
import { NavButtonProps } from "../model/PropsInterface";

const NavButton: React.FC<NavButtonProps> = ({
  to,
  children,
  isActive,
  onClick,
}) => {
  return (
    <li
      className={`nav-button mx-2 ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavButton;
