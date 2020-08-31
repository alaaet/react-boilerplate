import React, { useState, useEffect } from "react";
import { tagService } from "@/_services";
import { useTranslation } from "react-i18next";

const DimensionsTypeFilter = (props) => {
  const { handleChange } = props;
  const [dimensions, setDimensions] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    tagService.getDimensionTypes().then((x) => {
      x.unshift({ name: "All" });
      setDimensions(x);
    });
  }, []);
  return (
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="dimensions">Dimensions: </label>
        <select
          id="dimensions"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {dimensions.map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export { DimensionsTypeFilter };
