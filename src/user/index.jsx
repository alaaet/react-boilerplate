import React from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { EditAccount } from "./EditAccount";
import { PublicProfile } from "./PublicProfile";
import { useTranslation } from "react-i18next";

const User = ({ match }) => {
  const { t } = useTranslation();
  const { path } = match;
  return (
    <div className="container pb-3 mt-1 mb-5">
      <Tabs defaultTab="vertical-tab-one" className="horizontal-tabs">
        <TabList>
          <Tab tabFor="vertical-tab-one">{t("user.index.account")}</Tab>
          <Tab tabFor="vertical-tab-two">{t("user.index.public-profile")}</Tab>
          <Tab tabFor="vertical-tab-three">{t("user.index.billing")}</Tab>
        </TabList>

        <TabPanel tabId="vertical-tab-one" className="w-100">
          <EditAccount />
        </TabPanel>

        <TabPanel tabId="vertical-tab-two" className="w-100">
          <PublicProfile path={path} />
        </TabPanel>

        <TabPanel tabId="vertical-tab-three" className="w-100">
          <p>{t("user.index.billing-tab-content")}</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export { User };
