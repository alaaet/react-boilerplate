import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <nav
      id="footer"
      className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-light top-shadow "
    >
      <p className="blocktext">
        <Link to="/company/work-with-us" className="btn btn-link">
          Work with us
        </Link>
        <Link to="/company/about-us" className="btn btn-link">
          About
        </Link>
        <Link to="/company/contact-us" className="btn btn-link">
          Contact
        </Link>
      </p>
    </nav>
  );
};

export { Footer };
