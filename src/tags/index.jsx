import React from "react";

function Tags({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container">
        <p>Here you will see your tags</p>
      </div>
    </div>
  );
}

export { Tags };
