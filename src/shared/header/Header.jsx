import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaHamburger,
  FaSignInAlt,
  FaHome,
  FaUserEdit,
} from "react-icons/fa";
import { useEffect, useState } from "react";

//Add navigation links here !!!!
const paths = [
  { name: "Home", icon: <FaHome />, path: "/home" },
  { name: "Users", icon: <FaUser />, path: "/users" },
  { name: "Restaurants", icon: <FaHamburger />, path: "/restaurants" },
  { name: "Account", icon: <FaUserEdit />, path: "/account" },
  { name: "Login", icon: <FaSignInAlt />, path: "/login" },
];
const Header = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (window.innerWidth > 800 && open === false) setOpen(true);
  }, [open]);
  return (
    <div>
      <nav className="Header-nav">
        {!open ? (
          <FaBars
            onClick={toggleOpen}
            style={{ fontSize: "1.5em", color: "var(--color-light)" }}
          />
        ) : (
          <FaTimes
            onClick={toggleOpen}
            style={{ fontSize: "1.5em", color: "var(--color-light)" }}
          />
        )}
        <div className={open ? "Header-links-open" : "Header-links"}>
          {paths.map((data) => {
            let classes =
              location.pathname === data.path
                ? "Header-link Header-link-open"
                : "Header-link";
            return (
              <Link to={data.path} className={classes}>
                {data.icon}
                <span className="Header-margin-left">{data.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="Header-spacer">{children}</div>
    </div>
  );
};

export default Header;
