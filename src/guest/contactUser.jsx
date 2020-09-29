import React from "react";
import { useTranslation } from "react-i18next";

const ContactUser = (props) => {
  const { t } = useTranslation();
  const { username } = props;
  return (
    <section id="contact">
      <div className="well well-sm">
        <h3>
          {t("examine-result.contact-form.title", { username: username })}
        </h3>
      </div>

      <div className="col">
        <form>
          <div className="form-group">
            <textarea
              className="form-control"
              name=""
              rows="3"
              placeholder={t("examine-result.contact-form.msg-ph")}
            ></textarea>
          </div>
          <button className="btn btn-default" type="submit" name="button">
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
            &nbsp;{t("examine-result.contact-form.submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUser;
