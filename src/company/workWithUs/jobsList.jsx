import React, { useState, useEffect } from "react";
import { JobPositionsDD, JobTypesDD, JobLocationsDD } from "./filters";
import JobsSection from "./jobsSection";
import { useTranslation } from "react-i18next";

const JobsList = (props) => {
  const [currentPosition, setPosition] = useState("");
  const [currentType, setType] = useState("");
  const [currentLocation, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const { history } = props;
  const { t } = useTranslation();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setFilteredJobs(
      filterByLocation(
        filterByType(filterByPosition(jobs, currentPosition), currentType),
        currentLocation
      )
    );
  }, [currentPosition, currentType, currentLocation]);
  return (
    <React.Fragment>
      <div className="col-md-10">
        <form className="filter-form mt-5 mb-4">
          <div className="row">
            <JobPositionsDD handleChange={setPosition} />
            <JobTypesDD handleChange={setType} />
            <JobLocationsDD handleChange={setLocation} />
          </div>
        </form>

        <div className="job-list__wrapper mb-6">
          {jobPositions.map((position, index) => {
            let items = filterByPosition(filteredJobs, position);
            return (
              <JobsSection
                items={items}
                position={t("work-with-us.positions." + position.toLowerCase())}
                key={index}
                history={history}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

// Filters
const filterByPosition = (items, position) => {
  if (position === "") return items;
  else
    return items.filter((item, index) => {
      return item.position === position;
    });
};
const filterByType = (items, type) => {
  if (type === "") return items;
  else
    return items.filter((item, index) => {
      return item.type === type;
    });
};
const filterByLocation = (items, location) => {
  if (location === "") return items;
  else
    return items.filter((item, index) => {
      return item.location === location;
    });
};

const jobs = [
  {
    position: "Business",
    initials: "FD",
    name: "Freelance Distributer",
    type: "Full-time",
    location: "Sevilla",
  },
  {
    position: "Business",
    initials: "FD",
    name: "Freelance Distributer",
    type: "Full-time",
    location: "Madrid",
  },
  {
    position: "Business",
    initials: "FD",
    name: "Freelance Distributer",
    type: "Full-time",
    location: "Barcelona",
  },
  {
    position: "Business",
    initials: "FD",
    name: "Freelance Distributer",
    type: "Full-time",
    location: "Zaragoza",
  },
  {
    position: "Design",
    initials: "CD",
    name: "CSS Developer",
    type: "Full-time",
    location: "Zaragoza",
  },
];

const jobPositions = [
  "Business",
  "Design",
  "Development",
  "Engineering",
  "Finance",
  "Marketing",
];
export default JobsList;
