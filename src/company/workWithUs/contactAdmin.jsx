import React from "react";
import { useTranslation } from "react-i18next";

const contactAdmin = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className=" mb-5">
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name=""
            value=""
            placeholder={t("work-with-us.contact.name-ph")}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name=""
            value=""
            placeholder={t("work-with-us.contact.e-mail-ph")}
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            name=""
            value=""
            placeholder={t("work-with-us.contact.phone-ph")}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name=""
            rows="3"
            placeholder={t("work-with-us.contact.msg-ph")}
          ></textarea>
        </div>
        <button className="btn btn-default" type="submit" name="button">
          <i className="fa fa-paper-plane-o" aria-hidden="true"></i>{" "}
          {t("work-with-us.contact.submit")}
        </button>
      </form>
    </section>
  );
};

export default contactAdmin;
