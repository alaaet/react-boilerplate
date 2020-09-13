import React, { useEffect, useState } from "react";
import AlertItem from "../profile/AlertItem";
import ContactUser from "./contactUser";
import { accountService } from "@/_services";
import { useTranslation } from "react-i18next";

const PublicAlert = ({ history, match }) => {
  const { id } = match.params;
  const { t } = useTranslation();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `This is the public information for the Tag: ${id}`;
    // Get the user data
    accountService
      .getByTagCode(id)
      .then((x) => {
        console.log(x);
        setUser(x);
      })
      .catch(() => {
        //redirect to not found page
        const { from } = { from: { pathname: "/guest/not-found" } };
        console.log(from);
        history.push(from);
      });
  }, [id]);

  return (
    <div className="pt-3">
      <div className="row h-100 justify-content-center align-items-center mb-3">
        <div className="col-md-4 col-xl-4" data-aos="fade-up">
          <div className="card-one shadow p-5">
            <h1 className="display-4">
              {user.profileImage !== "" && user.profileImage !== null ? (
                <img
                  className="img-fluid img-thumbnail rounded-circle"
                  width="150px"
                  src={user.profileImage}
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
            </h1>
            <p className="lead">
              {t("honorifics.mr")} {user.firstName} {user.lastName}
            </p>
            <span className="badge"> {user.email}</span>
            <hr className="my-4" />
            <p>this is a description about me...</p>
            <div className="d-flex justify-content-around">
              <a href="#" className="btn btn-outline-dark">
                <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                {t("examine-result.profile.call-me")}
              </a>
              <a href="#" className="btn btn-outline-dark">
                <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                {t("examine-result.profile.contact-me")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <AlertItem alert={alert} index={1} isGuest={true} />
      <hr />
      <ContactUser />
    </div>
  );
};

const alert = {
  date: "Thursday 2020/07/22",
  title: "I lost my wallet",
  description: "The item was lost on day yyyy/mm/dd in the area of blabla",
};

export default PublicAlert;
