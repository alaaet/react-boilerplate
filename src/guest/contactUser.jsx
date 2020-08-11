import React from "react";
import { useTranslation } from "react-i18next";

const ContactUser = () => {
  const { t } = useTranslation();

  return (
    <section id="contact">
      <div className="well well-sm">
        <h3>{t("examine-result.contact-form.title", { username: "John" })}</h3>
      </div>

      <div className="col-md-5">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name=""
              value=""
              placeholder={t("examine-result.contact-form.name-ph")}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name=""
              value=""
              placeholder={t("examine-result.contact-form.e-mail-ph")}
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              name=""
              value=""
              placeholder={t("examine-result.contact-form.phone-ph")}
            />
          </div>
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
