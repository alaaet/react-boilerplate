import React, { useState, useEffect } from "react";
import { tagService } from "@/_services";
import { useTranslation } from "react-i18next";

const MaterialTypeFilter = (props) => {
  const { handleChange } = props;
  const [materials, setMaterials] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    tagService.getMaterialTypes().then((x) => {
      x.unshift({ material: "All" });
      setMaterials(x);
    });
  }, []);
  return (
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="material">Material: </label>
        <select
          id="material"
          className="custom-select"
          onChange={(e) => handleChange(e.target.value)}
        >
          {materials.map((item, index) => {
            return (
              <option key={index} value={item.material}>
                {item.material}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export { MaterialTypeFilter };
