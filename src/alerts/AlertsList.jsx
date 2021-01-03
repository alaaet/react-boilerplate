import React, { useState, useEffect } from "react";
import { AlertItem } from "./AlertItem";
import Header from "./header";
import { alertService,notificationService } from "@/_services";
import { useTranslation } from "react-i18next";

const AlertsList = ({ match }) => {
  const { path } = match;
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    alertService.getAllByUser().then((x) => {
      setAlerts(x)
    });
  }, []);

  const deleteAlert = (alert) => { 
    alertService.delete(alert.id).then(() => {
      notificationService.success("Alert deleted successfully");
      setAlerts(alerts.filter(a => a.id !== alert.id));
    }).catch((error) => {
        notificationService.error(error);
      });
  }
  return (
    <div>
      <Header path={path} />
      <div className="card-deck">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => {
            return (
              <AlertItem
                alert={alert}
                key={index}
                index={index}
                isGuest={false}
                path={path}
                handleDelete={deleteAlert}
              />
            );
          })
        ) : (
          <div className="w-100">
          <p className="text-center">
            <span className="spinner-border spinner-border-lg align-center"></span>
              </p>
              </div>
        )}
      </div>
    </div>
  );
};

export { AlertsList };
