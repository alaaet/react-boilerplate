import React, { useState, useEffect } from "react";
import { AlertItem } from "./AlertItem";
import Header from "./header";
import { notificationService } from "@/_services";
import { useTranslation } from "react-i18next";

const AlertsList = ({ match }) => {
  const { path } = match;
  const { t } = useTranslation();
  //console.log("AlertsList path:", path);
  const [currentAlerts, setCurrentAlerts] = useState(alerts);
  const [deletedAlert, setDeletedAlert] = useState(null);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (deletedAlert !== null) {
      console.log(deletedAlert);
      setCurrentAlerts(
        currentAlerts.filter(function (alert) {
          if (alert.id === deletedAlert.id)
            notificationService.success(
              t("alerts.del-notification", { alertTitle: alert.title })
            );
          else return true;
        })
      );
    }
  }, [deletedAlert]);
  return (
    <div>
      <Header path={path} />
      <div className="row">
        {currentAlerts.length > 0 ? (
          currentAlerts.map((alert, index) => {
            return (
              <AlertItem
                alert={alert}
                key={index}
                index={index}
                isGuest={false}
                path={path}
                handleDelete={setDeletedAlert}
              />
            );
          })
        ) : (
          <p className={"text-muted blocktext pb-3"}>
            you currently have no active alerts, to add a new alert, please
            check the tags section!
          </p>
        )}
      </div>
    </div>
  );
};

const alerts = [
  {
    id: 0,
    date: "Thursday 2020/07/22",
    title: "I lost my wallet",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
  {
    id: 1,
    date: "Thursday 2020/07/22",
    title: "I lost my cat",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
  {
    id: 2,
    date: "Thursday 2020/07/22",
    title: "I lost my dog",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
  {
    id: 3,
    date: "Thursday 2020/07/22",
    title: "I lost my laptop",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
  {
    id: 4,
    date: "Thursday 2020/07/22",
    title: "I lost my bag",
    description: "The item was lost on day yyyy/mm/dd in the area of blabla",
  },
];

export { AlertsList };
