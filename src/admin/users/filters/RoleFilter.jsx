import React from "react";
import { useTranslation } from "react-i18next";

const RoleFilter = (props) => {
  const { handleChange } = props;
  const { t } = useTranslation();
  return (
    <div className="col-md-4 ">
      <div className="form-group">
        <label htmlFor="role">Role: </label>
        <select
          id="role"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {roles.map((role, index) => {
            return (
              <option key={index} value={role}>
                {role}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

const roles = ["All", "User", "Admin"];

export { RoleFilter };
