import React from "react";
import Job from "./job";
const JobsSection = (props) => {
  const { items, position, history } = props;
  if (items.length > 0)
    return (
      <React.Fragment>
        <h3 className="mb-4">{position}</h3>
        {items.map((job, index) => {
          return <Job job={job} key={index} index={index} history={history} />;
        })}
      </React.Fragment>
    );
  else return null;
};

export default JobsSection;
