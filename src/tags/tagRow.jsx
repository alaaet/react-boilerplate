import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomModal } from "@/_components";

const TagRow = (props) => {
  const { tag, index, path, handleDelete } = props;
  const deleteButton = {
    variant: "danger",
    className: "",
    style: { width: "60px" },
    size: "sm",
    innerHtml: () => {
      return <span>Delete</span>;
    },
  };
  const deleteModalContent = {
    title: "Confirm Delete",
    description: "Are you sure you want to delete this tag?",
    confirmBtn: "Delete",
  };
  return (
    <tr key={tag.id}>
      <td>{tag.code}</td>
      <td>{tag.status}</td>
      <td className="additional">{tag.activationDate}</td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link
          to={{
            pathname: `${path}/create-alert/${tag.id}`,
            state: { alert: null, tag: tag },
          }}
          className="btn btn-sm btn-success mr-1"
        >
          Create Alert
        </Link>
        <Link
          to={`${path}/edit/${tag.id}`}
          className="btn btn-sm btn-primary mr-1"
        >
          Edit
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
