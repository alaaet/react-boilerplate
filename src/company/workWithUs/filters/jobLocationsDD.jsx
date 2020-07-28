import React from "react";

const JobLocationsDD = (props) => {
  const { handleChange } = props;
  return (
    <div className="col-md-4 mb-3">
      <div className="form-group">
        <label htmlFor="jobLocation">Location : </label>
        <select
          id="jobLocation"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {joblocations.map((joblocation, index) => {
            return (
              <option key={index} value={joblocation}>
                {joblocation}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

const joblocations = ["", "Sevilla", "Madrid", "Barcelona", "Zaragoza"];

export { JobLocationsDD };
