import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { accountService } from "@/_services";

function PublicProfile({ match }) {
  const { path } = match;
  const user = accountService.userValue;
  const [publicProfile, setPublicProfile] = useState({
    name: "",
    email: "",
    profilePicture: "",
    contactDetails: [{ type: "", value: "" }],
  });
  const { t } = useTranslation();

  useEffect(() => {
    // Get the user data
    accountService
      .getPublicProfile()
      .then((x) => {
        setPublicProfile(x);
      })
      .catch(() => {
        //redirect to not found page
        const { from } = { from: { pathname: "/guest/not-found" } };
        console.log(from);
        history.push(from);
      });
  }, []);

  return (
    <div className="col">
      <h5 className="blocktext mt-2 mb-2">
        {t("profile.pp-card-title")}&nbsp;
        <Link
          to={`/user/publicProfile`}
          className="btn btn-outline-dark blocktext"
        >
          <i className="fa fa-cog" aria-hidden="true"></i>
        </Link>
      </h5>
      <div className="card card-one text-center mb-3 col-xl-4 col-md-8 shadow">
        <div className="card-body">
          {publicProfile.profilePicture !== "" &&
          publicProfile.profilePicture !== null ? (
            <img
              className="img-fluid img-thumbnail rounded-circle"
              width="150px"
              src={publicProfile.profilePicture}
              alt="Profile image"
            />
          ) : (
            <img
              className="img-fluid img-thumbnail rounded-circle"
              width="150px"
              src={require("../img/no_profile_img.png")}
              alt="Profile image"
            />
          )}
          <p className="lead">{publicProfile.name}</p>
          <p>
            <a
              className="  d-md-inline"
              href={"mailto:" + publicProfile.email}
              target="_blank"
            >
              {publicProfile.email}
            </a>
          </p>
          <hr className="my-4" />
          <p className="lead">Additional details:</p>
          {publicProfile.contactDetails.map((additionalField, index) =>
            renderContactDetail(additionalField, index)
          )}
          <div className="d-flex justify-content-around">
            <a href="#" className="btn btn-outline-dark">
              <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
              {t("examine-result.profile.contact-me")}
            </a>
          </div>          
        </div>
        </div>
      <div className="card card-one text-center mb-3 p-3 col-xl-4 col-md-8 shadow">
        <Link to={{
          pathname: `/alerts/create`,
          state: { alert: null },
        }}
          className="text-uppercase text-warning font-weight-bold"><i className="fa fa-bell-o" aria-hidden="true"></i>{" "}Create Alert</Link>
          </div>

    </div>
  );
}

const renderContactDetail = (field, index) => {
  switch (field.type) {
    case "phone":
    case "mobile":
      return (
        <p key={index}>
          <a className="  d-md-inline" href={"tel:" + field.value}>
            {field.value}
          </a>
        </p>
      );
    case "email":
      return (
        <p key={index}>
          <a
            className="  d-md-inline"
            href={"mailto:" + field.value}
            target="_blank"
          >
            {field.value}
          </a>
        </p>
      );
    default:
      return <p key={index}>{field.value}</p>;
  }
};
export { PublicProfile };
