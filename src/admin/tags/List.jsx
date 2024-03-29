import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { MaterialTypeFilter, DimensionsTypeFilter } from "./filters";
import { tagService } from "@/_services";
import TagRow from "./tagRow";

function List({ match }) {
  const { path } = match;
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState(tags);
  const [offset, setOffset] = useState(0);
  const [tagsPerPage, setTagsPerPage] = useState(10);
  const [currentMaterialType, setMaterialType] = useState("All");
  const [currentDimensionType, setDimensionType] = useState("All");
  const [filtersMenuCollapsed, setFiltersMenuCollapsed] = useState(true);
  const [currentPageTags, setCurrentPageTags] = useState([]);
  const [deletedTag, setDeletedTag] = useState(null);
  useEffect(() => {
    if (tags.length == 0)
      tagService.getAll().then((x) => {
        setTags(x);
        setFilteredTags(x);
      });
    else {
      setFilteredTags(
        filterByMaterial(
          filterByDimensions(tags, currentDimensionType),
          currentMaterialType
        )
      );
      setOffset(0);
    }
  }, [currentMaterialType, currentDimensionType]);

  useEffect(() => {
    let maxIndex =
      filteredTags.length < offset + tagsPerPage
        ? filteredTags.length
        : offset + tagsPerPage;
    setCurrentPageTags(filteredTags.slice(offset, maxIndex));
  }, [filteredTags, offset]);

  useEffect(() => {
    if (deletedTag !== null) {
      deleteTag(deletedTag.id);
    }
  }, [deletedTag]);

  function deleteTag(id) {
    tagService.delete(id).then(() => {
      console.log("deleted!");
      setFilteredTags((filteredTags) =>
        filteredTags.filter((x) => x.id !== id)
      );
    });
  }
  const handlePageClick = ({ selected }) => {
    console.log(selected);
    setOffset(Math.ceil(selected * tagsPerPage));
  };
  function toggleFilters() {
    setFiltersMenuCollapsed(!filtersMenuCollapsed);
  }

  const filterByMaterial = (items, materialType) => {
    if (materialType === "All") return items;
    else
      return items.filter((item, index) => {
        return (
          item.materialType.toLowerCase() ===
          materialType.toLowerCase()
        );
      });
  };

  const filterByDimensions = (items, dimensionsType) => {
    if (dimensionsType === "All") return items;
    else
      return items.filter((item, index) => {
        return (
          item.dimensionType.toLowerCase() === dimensionsType.toLowerCase()
        );
      });
  };
  return (
    <div className="mb-5">
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
            <DimensionsTypeFilter handleChange={setDimensionType} />
          </div>
        </div>
      </div>
      {filteredTags.length > 0 && (
        <React.Fragment>
          <table className="table table-responsive table-striped table-hover ">
            <thead>
              <tr className="bg-success">
                <th style={{ width: "30%" }}>Value</th>
                <th style={{ width: "30%" }} className="additional">
                  User id
                </th>
                <th style={{ width: "30%" }}>Has Alerts?</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>
              {currentPageTags.map((tag, index) => (
                <TagRow
                  key={index}
                  tag={tag}
                  index={index}
                  path={path}
                  handleDelete={setDeletedTag}
                />
              ))}
            </tbody>
          </table>
          {filteredTags.length > tagsPerPage && (
            <ReactPaginate
              previousLabel={"<previous"}
              nextLabel={"next>"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={filteredTags.length / tagsPerPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          )}
        </React.Fragment>
      )}
      {filteredTags.length == 0 &&
        currentMaterialType == "All" &&
        currentDimensionType == "All" && (
          <p className="text-center">
            <span className="spinner-border spinner-border-lg align-center"></span>
          </p>
        )}
      {filteredTags.length == 0 &&
        (currentMaterialType != "All" || currentDimensionType != "All") && (
          <p className="text-center">This filter did not yeald any results!</p>
        )}
    </div>
  );
}

export { List };
