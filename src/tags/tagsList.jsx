import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Activate from "./activate";

const TagsList = ({ match }) => {
  const { path } = match;
  console.log(path);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    // tagService.getAll().then(x => setTags(x));
    // get all tags
    setTags(randomTags);
  }, []);

  function deleteTag(id) {
    setTags(
      tags.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    /*
    tagService.delete(id).then(() => {
      setTags((tags) => tags.filter((x) => x.id !== id));
    });*/
    // Delete the tag using the API
  }

  return (
    <React.Fragment>
      <Activate />

      <div>
        <h1 className="blocktext">My tags</h1>
        <table className="table table-responsive table-striped table-bordered">
          <thead className="thead-dark bg-dark">
            <tr>
              <th style={{ width: "30%" }}>Tag code</th>
              <th style={{ width: "30%" }}>Status</th>
              <th style={{ width: "25%" }} className="additional">
                Activation date
              </th>
              <th style={{ width: "15%" }}></th>
            </tr>
          </thead>
          <tbody>
            {tags &&
              tags.map((tag) => (
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
            {!tags && (
              <tr>
                <td colSpan="4" className="text-center">
                  <span className="spinner-border spinner-border-lg align-center"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

const randomTags = [
  {
    id: 0,
    code: "sdasdasd",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 1,
    code: "asdasd",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 2,
    code: "tjurth",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 3,
    code: "hkghkh",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 4,
    code: "srture",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 5,
    code: "vwetwbt",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 6,
    code: "werq45",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 7,
    code: "42dgsdf",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 8,
    code: "hjhgk",
    status: "active",
    activationDate: "25/07/2020",
  },
  {
    id: 9,
    code: "wwewe",
    status: "active",
    activationDate: "25/07/2020",
  },
];

export default TagsList;
