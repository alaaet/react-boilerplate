import React from "react";
import AlertItem from "./AlertItem";

const Alerts = () => {
  return (
    <div>
      {alerts.map((alert, index) => {
        return (
          <AlertItem alert={alert} key={index} index={index} isGuest={false} />
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
export default Alerts;
