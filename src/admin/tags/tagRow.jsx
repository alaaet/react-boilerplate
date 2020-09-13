import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomModal } from "@/_components";
import { useTranslation } from "react-i18next";

const TagRow = (props) => {
  const { tag, index, path, handleDelete } = props;
  const { t } = useTranslation();
  const deleteButton = {
    variant: "danger",
    className: "btn-sm",
    style: { width: "60px" },
    size: "sm",
    innerHtml: () => {
      return <span>{t("tags.btns.del")}</span>;
    },
  };
  const deleteModalContent = {
    title: t("tags.modal.title"),
    description: t("tags.modal.description"),
    confirmBtn: t("tags.modal.confirmBtn"),
  };

  return (
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
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <span className="d-none d-md-inline">&nbsp;Edit</span>
        </Link>
        <CustomModal
          handleAction={() => handleDelete(tag)}
          btn={deleteButton}
          val={index}
          content={deleteModalContent}
        />
      </td>
    </tr>
  );
};

export default TagRow;
