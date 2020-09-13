import React from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { Account } from "./Account";
import { PublicProfile } from "./PublicProfile";

const User = ({ match }) => {
  const { path } = match;
  return (
    <div className="container pb-3 mt-5">
      <Tabs defaultTab="vertical-tab-one" vertical className="vertical-tabs">
        <TabList>
          <Tab tabFor="vertical-tab-one">Account</Tab>
          <Tab tabFor="vertical-tab-two">Public Profile</Tab>
          <Tab tabFor="vertical-tab-three">Billing</Tab>
        </TabList>

        <TabPanel tabId="vertical-tab-one" className="w-100">
          <Account />
        </TabPanel>

        <TabPanel tabId="vertical-tab-two" className="w-100">
          <PublicProfile path={path} />
        </TabPanel>

        <TabPanel tabId="vertical-tab-three" className="w-100">
          <p>Billing tab content</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export { User };
