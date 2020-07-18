import React from "react";
import { Link } from "react-router-dom";

function Overview({ match }) {
  const { path } = match;
  return (
    <div>
      <h1>My tags overview</h1>
      <p>This section is dedicated to managing my tags.</p>
      <p>
        <Link to={`${path}/my-tags`}>Manage My Tags</Link>
      </p>
    </div>
  );
}

export default Overview;
