import React from "react";

const JobTypesDD = (props) => {
  const { handleChange } = props;
  return (
    <div className="col-md-4 mb-3">
      <div className="form-group">
        <label htmlFor="jobType">Type :</label>
        <select
          id="jobType"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {jobTypes.map((jobType, index) => {
            return (
              <option key={index} value={jobType}>
                {jobType}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

const jobTypes = ["", "Full-time", "Part-time", "Remote"];

export { JobTypesDD };
