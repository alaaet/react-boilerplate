import React from "react";
import { useTranslation } from "react-i18next";
import { accountService } from "@/_services";

function Home() {
  const user = accountService.userValue;
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <div className="container">
        <h1>{t("home.welcome-msg-l1", { username: user.firstName })}</h1>
        <p>{t("home.welcome-msg-l2")}</p>
      </div>
    </div>
  );
}

export { Home };
