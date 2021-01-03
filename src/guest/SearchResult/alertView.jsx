import React from "react";
import { Link } from "react-router-dom";
import { CustomModal } from "@/_components";
import { useTranslation } from "react-i18next";

const AlertView = (props) => {
    const { alert, index } = props;
    const { t } = useTranslation();

  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 pl-0 pr-0">
      <div className="card text-center mb-3 ">
        <div className="card-header" style={{ backgroundColor: "#343a40" }}>
          <span className="date text-white" style={{ float: "left" }}>
            Last update: {formattedDate(alert.updatedAt)}
          </span>         
        </div>
        <div className="card-body">
          <h5 className="card-title">{alert.title}</h5>
          <p className="card-text mb-0">{truncateString(alert.body)}</p>
        </div>       
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

export { AlertView };
