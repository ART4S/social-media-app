import React from "react";
import { Box, Paper, Tabs, Tab } from "@material-ui/core";

import TabPanel from "components/TabPanel/TabPanel";
import FollowingsSection from "./FollowingsSection/FollowingsSection";

const tabs = ["POSTS", "FOLLOWINGS", "FOLLOWERS"];

export default function ProfileSections() {
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <div>
      <Paper style={{ width: "100%" }}>
        <Tabs
          value={currentTab}
          onChange={(_, tab: number) => setCurrentTab(tab)}
          variant="fullWidth"
        >
          {tabs.map((x) => (
            <Tab key={x} label={x} />
          ))}
        </Tabs>
      </Paper>

      <TabPanel value={currentTab} index={0}>
        <Box py={2}>{/* <PostList data={posts} /> */}</Box>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <Box py={2}>
          <FollowingsSection />
        </Box>
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        {/* <Box display="flex" flexDirection="column" py={2}>
          <SearchBar
            placeholder="Search by followers..."
            searchText={followerSearchText}
            onSearchTextChange={(text: string) => setFollowerSearchText(text)}
          />

          <Box mt={2}>
            <FollowList data={users} />
          </Box>
        </Box> */}
      </TabPanel>
    </div>
  );
}
