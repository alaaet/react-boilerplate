import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <nav
      id="footer"
      className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-light top-shadow "
    >
      <p className="blocktext">
        <Link to="/" className="btn btn-link-violet">
          {t("footer.home")}
        </Link>
        <Link to="/company/work-with-us" className="btn btn-link-violet">
          {t("footer.work-with-us")}
        </Link>
        <Link to="/company/about-us" className="btn btn-link-violet">
          {t("footer.about")}
        </Link>
        <Link to="/company/contact-us" className="btn btn-link-violet">
          {t("footer.contact")}
        </Link>
      </p>
    </nav>
  );
};

export { Footer };
