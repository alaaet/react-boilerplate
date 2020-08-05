import React, { useState, useEffect } from "react";
import Activate from "./activate";
import { notificationService } from "@/_services";
import TagRow from "./tagRow";

const TagsList = ({ match }) => {
  const { path } = match;
  console.log(path);
  const [deletedTag, setDeletedTag] = useState(null);
  const [tags, setTags] = useState(randomTags);

  useEffect(() => {
    // get all tags
    if (deletedTag !== null) {
      console.log(deletedTag);
      setTags(
        tags.filter(function (tag) {
          if (tag.id === deletedTag.id)
            notificationService.success(
              `The tag with code: (` +
                tag.code +
                `) has been deleted successfully!`
            );
          else return true;
        })
      );
    }
  }, [deletedTag]);

  return (
    <React.Fragment>
      <Activate />

      <div>
        <h1 className="blocktext">My tags</h1>
        {tags.length > 0 ? (
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
              {tags.map((tag, index) => (
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
        ) : (
          <p className={"text-muted blocktext pb-3"}>
            you currently have no active tags, use the the Activation section
            above to start enjoying our tags
          </p>
        )}
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
