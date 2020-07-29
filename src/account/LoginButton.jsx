import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link
      to="/account/login"
      type="button"
      class="btn btn-primary float-right m-2"
    >
      <i class="fa fa-sign-in" aria-hidden="true"></i>
    </Link>
  );
};

export default LoginButton;
