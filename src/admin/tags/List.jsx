import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MaterialTypeFilter } from "./filters";
import { tagService } from "@/_services";

function List({ match }) {
  const { path } = match;
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState(tags);
  const [currentMaterialType, setMaterialType] = useState("All");
  const [filtersMenuCollapsed, setFiltersMenuCollapsed] = useState(true);
  useEffect(() => {
    if (tags.length == 0)
      tagService.getAll().then((x) => {
        setTags(x);
        setFilteredTags(x);
      });
    else {
      setFilteredTags(filterByMaterial(tags, currentMaterialType));
    }
  }, [currentMaterialType]);

  function deleteTag(id) {
    setTags(
      tags.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    tagService.delete(id).then(() => {
      setTags((tags) => tags.filter((x) => x.id !== id));
    });
  }

  function toggleFilters() {
    setFiltersMenuCollapsed(!filtersMenuCollapsed);
  }

  const filterByMaterial = (items, materialType) => {
    if (materialType === "All") return items;
    else
      return items.filter((item, index) => {
        return (
          item.materialType.material.toLowerCase() ===
          materialType.toLowerCase()
        );
      });
  };
  return (
    <div>
      <h1>Tags</h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        <i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Add Tag
      </Link>
      <button
        className="btn btn-sm btn-outline-secondary ml-3 mb-2"
        type="button"
        onClick={toggleFilters}
      >
        <i className="fa fa-filter" aria-hidden="true"></i>&nbsp;
        {!filtersMenuCollapsed ? "Hide " : "Show "}filters
      </button>
      <div className={" collapse" + (filtersMenuCollapsed ? "" : " show")}>
        <div className="card card-body p-3">
          <div className="row">
            <MaterialTypeFilter handleChange={setMaterialType} />
            <MaterialTypeFilter handleChange={setMaterialType} />
            <MaterialTypeFilter handleChange={setMaterialType} />
          </div>
        </div>
      </div>
      {filteredTags.length > 0 && (
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Value</th>
              <th style={{ width: "30%" }} className="additional">
                User id
              </th>
              <th style={{ width: "30%" }}>Has Alerts?</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredTags.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.value}</td>
                <td className="additional">
                  {tag.userId == null ? "Unassigned" : tag.userId}
                </td>
                <td>{tag.alerts.length > 0 ? "Yse" : "No"}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${tag.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTag(tag.id)}
                    className="btn btn-sm btn-danger"
                    style={{ width: "60px" }}
                    disabled={tag.isDeleting}
                  >
                    {tag.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {filteredTags.length == 0 && currentMaterialType == "All" && (
        <p className="text-center">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </p>
      )}
      {filteredTags.length == 0 && currentMaterialType != "All" && (
        <p className="text-center">This filter did not yeald any results!</p>
      )}
    </div>
  );
}

export { List };
