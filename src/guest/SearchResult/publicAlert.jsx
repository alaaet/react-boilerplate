import React, { useEffect, useState } from "react";
import { AlertView } from "./alertView";
import AddComment from "./Comments/addComment";
import { accountService ,commentService} from "@/_services";
import { useTranslation } from "react-i18next";
import {LoadingSpinner} from "@/_components";
import Comments from "./Comments";

const PublicAlert = ({ history, match }) => {
  const { id, hash } = match.params;
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [publicProfile, setPublicProfile] = useState({
    name: "",
    email: "",
    profilePicture: "",
    contactDetails: [{ type: "", value: "" }],
    alerts: [],
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `This is the public information for the Tag: ${id}`;
    // Get the user data
    accountService
      .getByTagCode(id)
      .then((x) => {
        setPublicProfile(x);
        setLoading(false);
      })
      .catch((e) => {
        if (e == "tagIsNotAssigned") {
          //notificationService.error(e);
          setLoading(false);
         }
        else { 
          //redirect to not found page
          const { from } = { from: { pathname: "/guest/not-found" } };
          history.push(from);
        }
      });
    commentService.getByTagCode(id)
      .then((comnts) => {
        setComments(comnts)
        console.log("COMMENTS: ", comnts);
      }).catch((e) => {
        console.error(e);
      });
  }, [id]);

  return (
    <React.Fragment>  
      {loading ? <LoadingSpinner /> :
        <div className="pt-3">
          {publicProfile.name != "" ?
            <React.Fragment>
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
                        src={require("../../img/no_profile_img.png")}
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
              {publicProfile.alerts.length > 0 && <><hr /><h4>Alerts</h4></>}
              <div className="card-deck">
                {publicProfile.alerts?.map((alert, index) => {
                    return (
                      <AlertView
                        alert={alert}
                        key={index}
                        index={index}
                        isGuest={false}
                        path={null}
                        handleDelete={null}
                      />
                    );
                  })
                }
              </div>
              <hr />
              {comments.length>0&&<Comments items={comments} />}
              <AddComment user={user} tagCode={id} hash={hash}/>
            </React.Fragment>
            :
            <div className="card card-one text-center mt-3 mb-3 col-xl-4 col-md-8 shadow">
              <div className="card-body">
                <p className="lead">Tag: {id} is not assigned yet!</p>
                <div className="d-flex justify-content-around">
                  <a href={"/tags/"+id} className="btn btn-outline-primary">
                      <i className="fa fa-qrcode" aria-hidden="true"></i>{" "}
                      Activate this tag
                    </a>
                  </div>
              </div>              
              </div>
          }</div>
    }
    </React.Fragment>
  );
};

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

export default PublicAlert;
