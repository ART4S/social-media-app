import React from "react";
import {
  Container,
  Box,
  Paper,
  Avatar,
  Divider,
  IconButton,
  Typography,
  Tabs,
  Tab,
  TabPanel,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import Header from "common/components/Header/Header";
import profiles from "mock/userProfiles";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";

export default function UserProfile(): JSX.Element {
  const classes = useStyles();
  const profile = profiles[0];
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <div>
      <Header />

      <Container className={classes.body} maxWidth="md">
        <Paper>
          <Box display="flex" justifyContent="center" color="primary" p={6}>
            <Typography className={classes.header} variant="h4" color="primary">
              Profile
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" mx={3}>
            <Box display="flex">
              <Box display="flex">
                <Avatar className={classes.avatar} src={profile.avatarUrl} />

                <Box display="flex" flexDirection="column" ml={2}>
                  <Typography className={classes.userName} variant="h6">
                    {getUserName(profile)}
                  </Typography>

                  <Typography className={classes.userEmail} variant="body2">
                    {profile.email}
                  </Typography>
                </Box>
              </Box>

              <Box flexGrow="1" />

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
              >
                <div>
                  <IconButton color="secondary">
                    <Edit />
                  </IconButton>

                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </div>
              </Box>
            </Box>

            <Box my={2}>
              <Divider />
            </Box>

            <Typography className={classes.joinDate}>
              {`Joined: ${profile.joined.toISOString()}`}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" mt={2}>
            <Paper>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
                centred
              >
                <Tab label="POSTS"></Tab>
                <Tab label="FOLLOWING"></Tab>
                <Tab label="FOLLOWERS"></Tab>
              </Tabs>
            </Paper>

            <TabPanel value={value} index={0}>
              POSTS
            </TabPanel>

            <TabPanel value={value} index={1}>
              FOLLOWING
            </TabPanel>

            <TabPanel value={value} index={1}>
              FOLLOWERS
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
