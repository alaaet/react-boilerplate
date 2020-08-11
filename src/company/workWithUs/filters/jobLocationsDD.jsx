import React from "react";
import { useTranslation } from "react-i18next";

const JobLocationsDD = (props) => {
  const { handleChange } = props;
  const { t } = useTranslation();

  return (
    <div className="col-md-4 mb-3">
      <div className="form-group">
        <label htmlFor="jobLocation">{t("work-with-us.filter3")} : </label>
        <select
          id="jobLocation"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {joblocations.map((joblocation, index) => {
            return (
              <option key={index} value={joblocation}>
                {joblocation.length > 0
                  ? t("work-with-us.locations." + joblocation.toLowerCase())
                  : ""}
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
