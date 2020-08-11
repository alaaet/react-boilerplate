import React from "react";
import { useTranslation } from "react-i18next";

const JobPositionsDD = (props) => {
  const { handleChange } = props;
  const { t } = useTranslation();

  return (
    <div className="col-md-4 mb-3">
      <div className="form-group">
        <label htmlFor="jobPosition">{t("work-with-us.filter1")} :</label>
        <select
          id="jobPosition"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {jobPositions.map((jobPosition, index) => {
            return (
              <option key={index} value={jobPosition}>
                {jobPosition.length > 0
                  ? t("work-with-us.positions." + jobPosition.toLowerCase())
                  : ""}
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
