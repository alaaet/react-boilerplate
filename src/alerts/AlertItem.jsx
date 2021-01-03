import React from "react";
import { Link } from "react-router-dom";
import { CustomModal } from "@/_components";
import { useTranslation } from "react-i18next";

const AlertItem = (props) => {
  const { alert, index, isGuest, path, handleDelete } = props;
  const { t } = useTranslation();
  //console.log("alert: ", alert);
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
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 pl-0 pr-0">
      <div className="card text-center mb-3 ">
        <div className="card-header bg-violet-medium" >
          <span className="date text-white" style={{ float: "left" }}>
            {formattedDate(alert.updatedAt)}
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
          <p className="card-text mb-0">{truncateString(alert.body)}</p>
        </div>
        {alert.tags.length>0 && <div className="card-footer">
          {alert.tags.map((t,i) => (<span class="badge bg-violet-medium text-white mr-1" key={i}>{t.value}</span>))}
        </div>}
      </div>
    </div>
  );
};

const formattedDate = (elms) => {
  let date =new Date(elms[0]+"-"+elms[1]+"-"+elms[2]).toLocaleDateString().toString();
  //console.log("Date: ", date);
  return date;
};

const truncateString = (string)=>{ 
  var length = 100;
  return string.length > length ? string.substring(0, length - 3) + "..." :  string;
}

export { AlertItem };
