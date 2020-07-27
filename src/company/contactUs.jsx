import React from "react";

const ContactUs = () => {
  return (
    <section id="contact">
      <div className="well well-sm">
        <h3 className="text-success">Contact Us</h3>
      </div>

      <div className="row">
        <div className="col-md-7">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12678.601703340068!2d-5.930171011463516!3d37.398098574056625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126f311a421575%3A0xee06aca07d9f2f6c!2sSevilla%20Este%2C%20Seville!5e0!3m2!1sen!2ses!4v1595884980446!5m2!1sen!2ses"
            width="100%"
            height="315"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
          ></iframe>
        </div>

        <div className="col-md-5">
          <h4>
            <strong>Get in Touch</strong>
          </h4>
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
      </div>
    </section>
  );
};

export default ContactUs;
