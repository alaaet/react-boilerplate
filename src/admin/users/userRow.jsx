import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomModal } from "@/_components";
import { useTranslation } from "react-i18next";

const UserRow = (props) => {
  const { user, index, path, handleDelete } = props;
  const { t } = useTranslation();
  const deleteButton = {
    variant: "danger",
    className: "btn-sm",
    style: { width: "60px" },
    size: "sm",
    innerHtml: () => {
      return <span>Delete</span>;
    },
  };
  const deleteModalContent = {
    title: "Delete a user",
    description: "Are you sure you want to delete this user?",
    confirmBtn: "Delete",
  };
  return (
    <tr key={user.id}>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td className="additional">{user.email}</td>
      <td>{user.role}</td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link
          to={`${path}/edit/${user.id}`}
          className="btn btn-sm btn-primary mr-1"
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <span className="d-none d-md-inline">&nbsp;Edit</span>
        </Link>
        <CustomModal
          handleAction={() => handleDelete(user)}
          btn={deleteButton}
          val={index}
          content={deleteModalContent}
        />
      </td>
    </tr>
  );
};

export default UserRow;
