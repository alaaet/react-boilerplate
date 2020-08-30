import React from "react";
import { Link } from "react-router-dom";

function Overview({ match }) {
  const { path } = match;

  return (
    <div>
      <h1>Admin</h1>
      <p>This section can only be accessed by administrators.</p>
      <div className="list-group " style={{ maxWidth: "300px" }}>
        <Link
          to={`${path}/users`}
          className="list-group-item list-group-item-action"
        >
          Manage Users
        </Link>
        <Link
          to={`${path}/tags`}
          className="list-group-item list-group-item-action"
        >
          Manage Tags
        </Link>
      </div>
    </div>
  );
}

export { Overview };
