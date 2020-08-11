import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs = ({ history, match }) => {
  const { path } = match;
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10">
          <h3 class="text-success">{t("about.title")}</h3>
          <br />
          <p>{t("about.description")}</p>
          {/* <h5>Objective:</h5>
          <hr />
          <p>
            Reference tag (RefTag) aims to connect the real world to the digital
            world, in a way that makes life easier, smarter, and safer.
          </p>
          <h5>Vision:</h5>
          <hr />
          <p>
            Reference tag (RefTag) aims to connect the real world to the digital
            world, in a way that makes life easier, smarter, and safer.
          </p>
          <h5>Mission:</h5>
          <hr />
          <p>
            Reference tag (RefTag) aims to connect the real world to the digital
            world, in a way that makes life easier, smarter, and safer.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
