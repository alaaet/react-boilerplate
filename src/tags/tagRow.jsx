import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomModal } from "@/_components";
import { useTranslation } from "react-i18next";

const TagRow = (props) => {
  const { tag, index, path, handleDelete } = props;
  console.log(tag);
  const { t } = useTranslation();
  const deleteButton = {
    variant: "danger",
    className: "",
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
      <td>{tag.materialType.material}</td>
      <td className="additional">{formattedDate(tag.assignedAt)}</td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link
          to={{
            pathname: `${path}/create-alert/${tag.id}`,
            state: { alert: null, tag: tag },
          }}
          className="btn btn-sm btn-success mr-1"
        >
          {t("tags.btns.new-alert")}
        </Link>
        <Link
          to={`${path}/edit/${tag.id}`}
          className="btn btn-sm btn-primary mr-1"
        >
          {t("tags.btns.edit")}
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

const formattedDate = (elms) => {
  return new Date(...elms).toLocaleDateString().toString();
};
export default TagRow;