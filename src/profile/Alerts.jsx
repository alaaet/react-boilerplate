import React from "react";
import AlertItem from "./AlertItem";

const Alerts = ({ path }) => {
  return (
    <div>
      {alerts.map((alert, index) => {
        return (
          <AlertItem
            alert={alert}
            tag={tags[index]}
            key={index}
            index={index}
            isGuest={false}
            path={path}
          />
        );
      })}
    </div>
  );
};

const alerts = [
  {
    date: "Thursday 2020/07/22",
    title: "I lost my wallet",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
  {
    date: "Thursday 2020/07/22",
    title: "I lost my cat",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
  {
    date: "Thursday 2020/07/22",
    title: "I lost my dog",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
  {
    date: "Thursday 2020/07/22",
    title: "I lost my laptop",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
  {
    date: "Thursday 2020/07/22",
    title: "I lost my bag",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
];

const tags = [
  {
    id: 0,
    code: "asdasd",
  },
  {
    id: 1,
    code: "mgmn",
  },
  {
    id: 2,
    code: "werewr",
  },
  {
    id: 3,
    code: "ppo5",
  },
  {
    id: 4,
    code: "qwe12",
  },
];
export default Alerts;
