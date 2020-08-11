import React from "react";
import { useTranslation } from "react-i18next";

const JobTypesDD = (props) => {
  const { handleChange } = props;
  const { t } = useTranslation();

  return (
    <div className="col-md-4 mb-3">
      <div className="form-group">
        <label htmlFor="jobType">{t("work-with-us.filter2")} :</label>
        <select
          id="jobType"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {jobTypes.map((jobType, index) => {
            return (
              <option key={index} value={jobType}>
                {jobType.length > 0
                  ? t("work-with-us.types." + jobType.toLowerCase())
                  : ""}
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
