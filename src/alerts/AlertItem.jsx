import React from "react";
import { Link } from "react-router-dom";
import { CustomModal } from "@/_components";
import { useTranslation } from "react-i18next";

const AlertItem = (props) => {
  const { alert, index, isGuest, path, handleDelete } = props;
  const { t } = useTranslation();

  const deleteButton = {
    variant: "outline-danger",
    className: "ml-2",
    style: "",
    size: "",
    innerHtml: () => {
      return;
    },
  };
  const deleteModalContent = {
    title: t("alerts.del-modal.title"),
    description: t("alerts.del-modal.description"),
    confirmBtn: t("alerts.del-modal.confirmBtn"),
  };

  return (
    <div className="col-4">
      <div className="card text-center mb-3 ">
        <div className="card-header" style={{ backgroundColor: "#343a40" }}>
          <span className="date text-white" style={{ float: "left" }}>
            {alert.date}
          </span>
          {!isGuest ? (
            <div style={{ float: "right" }}>
              <Link
                to={{
                  pathname: `${path}/edit/${alert.id}`,
                  state: { alert: alert },
                }}
                className="btn btn-outline-light"
              >
                <i className="fa fa-cog" aria-hidden="true"></i>
              </Link>
              <CustomModal
                handleAction={() => handleDelete(alert)}
                btn={deleteButton}
                val={index}
                content={deleteModalContent}
              />
            </div>
          ) : null}
        </div>
        <div className="card-body">
          <h5 className="card-title">{alert.title}</h5>
          <p className="card-text">{alert.description}</p>
        </div>
      </div>
    </div>
  );
};

export { AlertItem };
