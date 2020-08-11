import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InboxHeader = (props) => {
  const { handleClick } = props;
  const { t } = useTranslation();

  return (
    <div className="row ">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-header pt-1 pb-0">
          <p className="blocktext">{t("inbox.title")}</p>
        </div>
      </div>
    </div>
  );
};

export default InboxHeader;
