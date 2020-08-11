import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Job = (props) => {
  const { job, index, history } = props;
  const { t } = useTranslation();
  const bgColor = randomizeColor();
  return (
    <Link
      to={"/company/detailed/" + index}
      className="card p-0 mb-3 border-0 shadow-sm shadow--on-hover"
    >
      <div className="card-body">
        <span className="row justify-content-between align-items-center">
          <span className="col-md-5 color--heading">
            <span
              className={
                "badge badge-circle background--" + bgColor + " text-white mr-3"
              }
            >
              {job.initials}
            </span>{" "}
            {job.name}
          </span>

          <span className="col-5 col-md-3 my-3 my-sm-0 color--text">
            <i className="fa fa-clock mr-1"></i>{" "}
            {t("work-with-us.types." + job.type.toLowerCase())}
          </span>

          <span className="col-7 col-md-3 my-3 my-sm-0 color--text">
            <i className="fa fa-map-marker-alt mr-1"></i>{" "}
            {t("work-with-us.locations." + job.location.toLowerCase())}
          </span>

          <span className="d-none d-md-block col-1 text-center color--text">
            <small>
              <i className="fa fa-chevron-right"></i>
            </small>
          </span>
        </span>
      </div>
    </Link>
  );
};
const colors = ["danger", "tertiary", "success", "warning", "warning2", "info"];
const randomizeColor = () => {
  let val = colors[Math.floor(Math.random() * colors.length)];
  console.log(val);
  return val;
};
export default Job;
