import React from "react";

const ContactUser = () => {
  return (
    <section id="contact">
      <div className="well well-sm">
        <h3>Contact John</h3>
      </div>

      <div className="col-md-5">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name=""
              value=""
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name=""
              value=""
              placeholder="E-mail"
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              name=""
              value=""
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name=""
              rows="3"
              placeholder="Message"
            ></textarea>
          </div>
          <button className="btn btn-default" type="submit" name="button">
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i> Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUser;
