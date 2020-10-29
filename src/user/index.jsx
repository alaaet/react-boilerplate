import React, { useState, useEffect } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { EditAccount } from "./EditAccount";
import { PublicProfile } from "./PublicProfile";
import { useTranslation } from "react-i18next";

const User = ({ match }) => {
  const { t } = useTranslation();
  const { path } = match;
  const [defaultTab, setDefaultTab] = useState("editAccount");
  useEffect(() => {
    console.log(match.params);
    var tab = match.params.tab;
    if (tab != null) setDefaultTab(tab);
  }, []);
  return (
    <div className="container pb-3 mt-1 mb-5">
      <Tabs defaultTab={defaultTab} className="horizontal-tabs">
        <TabList>
          <Tab tabFor="editAccount">{t("user.index.account")}</Tab>
          <Tab tabFor="publicProfile">{t("user.index.public-profile")}</Tab>
          <Tab tabFor="billing">{t("user.index.billing")}</Tab>
        </TabList>

        <TabPanel tabId="editAccount" className="w-100">
          <EditAccount />
        </TabPanel>

        <TabPanel tabId="publicProfile" className="w-100">
          <PublicProfile path={path} />
        </TabPanel>

        <TabPanel tabId="billing" className="w-100">
          <p>{t("user.index.billing-tab-content")}</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export { User };
