import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { accountService } from "@/_services";
import { RoleFilter } from "./filters";
import UserRow from "./userRow";

function List({ match }) {
  const { path } = match;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [offset, setOffset] = useState(0);
  const [usersPerPage, setusersPerPage] = useState(10);
  const [currentRole, setCurrentRole] = useState("All");
  const [filtersMenuCollapsed, setFiltersMenuCollapsed] = useState(true);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);
  const [deletedUser, setDeletedUser] = useState(null);

  useEffect(() => {
    if (users.length == 0) {
      accountService.getAll().then((x) => {
        setUsers(x);
        setFilteredUsers(x);
      });
    } else {
      setFilteredUsers(filterByRole(users, currentRole));
      setOffset(0);
    }
  }, [currentRole]);

  useEffect(() => {
    let maxIndex =
      filteredUsers.length < offset + usersPerPage
        ? filteredUsers.length
        : offset + usersPerPage;
    setCurrentPageUsers(filteredUsers.slice(offset, maxIndex));
  }, [filteredUsers, offset]);

  useEffect(() => {
    if (deletedUser !== null) {
      deleteUser(deletedUser.id);
    }
  }, [deletedUser]);

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    accountService.delete(id).then(() => {
      setFilteredUsers((filteredUsers) =>
        filteredUsers.filter((x) => x.id !== id)
      );
    });
  }
  const handlePageClick = ({ selected }) => {
    console.log(selected);
    setOffset(Math.ceil(selected * usersPerPage));
  };
  function toggleFilters() {
    setFiltersMenuCollapsed(!filtersMenuCollapsed);
  }

  const filterByRole = (items, role) => {
    if (role === "All") return items;
    else
      return items.filter((item, index) => {
        return item.role.toLowerCase() === role.toLowerCase();
      });
  };

  return (
    <div className="mb-5">
      <h1>Users</h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        <i className="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Add User
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
        <div className="card card-body p-1">
          <RoleFilter handleChange={setCurrentRole} />
        </div>
      </div>
      {filteredUsers.length > 0 && (
        <React.Fragment>
          <table className="table table-responsive table-striped table-hover ">
            <thead>
              <tr className="bg-success">
                <th style={{ width: "30%" }}>Name</th>
                <th style={{ width: "30%" }} className="additional">
                  Email
                </th>
                <th style={{ width: "30%" }}>Role</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>
              {currentPageUsers.map((user, index) => (
                <UserRow
                  key={index}
                  user={user}
                  index={index}
                  path={path}
                  handleDelete={setDeletedUser}
                />
              ))}
            </tbody>
          </table>
          {filteredUsers.length > usersPerPage && (
            <ReactPaginate
              previousLabel={"<previous"}
              nextLabel={"next>"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={filteredUsers.length / usersPerPage}
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
      {filteredUsers.length == 0 && currentRole == "All" && (
        <p className="text-center">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </p>
      )}
      {filteredUsers.length == 0 && currentRole != "All" && (
        <p className="text-center">This filter did not yeald any results!</p>
      )}
    </div>
  );
}

export { List };
