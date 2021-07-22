import "./Header.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaHamburger } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = (props) => {
  const [open, setOpen] = useState(false);
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
          <Link to="/users" className="Header-link">
            <FaUser />
            <span className="Header-margin-left">Users</span>
          </Link>
          <Link to="/restaurants" className="Header-link">
            <FaHamburger />
            <span className="Header-margin-left">Restaurants</span>
          </Link>
        </div>
      </nav>
      <div className="Header-spacer">{props.children}</div>
    </div>
  );
};

export default Header;
