import React, { useState, useEffect } from "react";
import Activate from "./activate";
import ReactPaginate from "react-paginate";
import { tagService } from "@/_services";
import TagRow from "./tagRow";
import { useTranslation } from "react-i18next";

const TagsList = ({ match }) => {
  const { path , params} = match;
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState(params.tagId);
  const [offset, setOffset] = useState(0);
  const [tagsPerPage, setTagsPerPage] = useState(4);
  const [currentPageTags, setCurrentPageTags] = useState([]);
  const [deletedTag, setDeletedTag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(false);
    tagService.getAllByUser().then((x) => {
      setTags(x);
    });
    setIsLoading(true);
  }, []);

  useEffect(() => {
    console.log(tags);
    let maxIndex =
      tags.length < offset + tagsPerPage ? tags.length : offset + tagsPerPage;
    setCurrentPageTags(tags.slice(offset, maxIndex));
  }, [tags, offset]);

  useEffect(() => {
    if (deletedTag !== null) {
      deleteTag(deletedTag.id);
    }
  }, [deletedTag]);

  function deleteTag(id) {
    tagService.delete(id).then(() => {
      console.log("deleted!");
      setTags((tags) => tags.filter((x) => x.id !== id));
    });
  }

  const handlePageClick = ({ selected }) => {
    console.log(selected);
    setOffset(Math.ceil(selected * tagsPerPage));
  };

  const insertTag = (newTag) => {
    console.log(newTag);
    setTags([newTag, ...tags]);
  };

  return (
    <React.Fragment>
      <Activate handleActivate={insertTag} tagId={tagId} />
      <div>
        <h1 className="blocktext">{t("tags.table-title")}</h1>
        {tags.length > 0 ? (
          <React.Fragment>
            <table className="table table-responsive table-striped table-bordered">
              <thead className="bg-violet-medium text-white">
                <tr>
                  <th style={{ width: "35%" }}>{t("tags.table-h1")}</th>
                  <th style={{ width: "30%" }}>{t("tags.table-h2")}</th>
                  <th style={{ width: "25%" }} className="additional">
                    {t("tags.table-h3")}
                  </th>
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
            {tags.length > tagsPerPage && (
              <ReactPaginate
                previousLabel={"<previous"}
                nextLabel={"next>"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={tags.length / tagsPerPage}
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
        ) : !isLoading ? (
          <p className={"text-muted blocktext pb-3"}>{t("tags.no-tags")}</p>
        ) : (
          <p className="text-center">
            <span className="spinner-border spinner-border-lg align-center"></span>
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default TagsList;
