import React from "react";

const JobPositionsDD = (props) => {
  const { handleChange } = props;
  return (
    <div className="col-md-4 mb-3">
      <div className="form-group">
        <label htmlFor="jobPosition">Position :</label>
        <select
          id="jobPosition"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {jobPositions.map((jobPosition, index) => {
            return (
              <option key={index} value={jobPosition}>
                {jobPosition}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

const jobPositions = [
  "",
  "Business",
  "Design",
  "Development",
  "Engineering",
  "Finance",
  "Marketing",
];

export { JobPositionsDD };
