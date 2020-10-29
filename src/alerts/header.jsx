import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = ({ path }) => {
  const { t } = useTranslation();
  //console.log("Header path: ", path);
  return (
    <h5 className="blocktext mt-2 mb-2">
      {t("alerts.header.title")}&nbsp;
      <Link
        to={{
          pathname: `${path}/create`,
          state: { alert: null },
        }}
        className="btn btn-outline-dark blocktext"
      >
        <i className="fa fa-plus" aria-hidden="true"></i>
      </Link>
    </h5>
  );
};

export default Header;
