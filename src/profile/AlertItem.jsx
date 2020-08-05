import React from "react";
import { Link } from "react-router-dom";
import { CustomModal } from "@/_components";

const AlertItem = (props) => {
  const { alert, tag, index, isGuest, path, handleDelete } = props;
  const deleteButton = {
    variant: "outline-danger",
    className: "ml-2",
    style: "",
    size: "",
    innerHtml: () => {
      return <i className="fa fa-trash" aria-hidden="true"></i>;
    },
  };
  const deleteModalContent = {
    title: "Confirm Delete",
    description: "Are you sure you want to delete this alert?",
    confirmBtn: "Delete",
  };

  return (
    <div className="card text-center mb-3">
      <div className="card-header" style={{ backgroundColor: "#343a40" }}>
        <span className="date text-white" style={{ float: "left" }}>
          {alert.date}
        </span>
        {!isGuest ? (
          <div style={{ float: "right" }}>
            <Link
              to={{
                pathname: `${path}/update-alert/${tag.id}`,
                state: { alert: alert, tag: tag },
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
  );
};

export default AlertItem;
