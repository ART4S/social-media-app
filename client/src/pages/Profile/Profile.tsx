import React from "react";
import {
  Container,
  Box,
  Paper,
  Button,
  Avatar,
  Divider,
  IconButton,
  Typography,
  Link,
  Grid,
  Collapse,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Edit, Delete, KeyboardArrowDown } from "@material-ui/icons";
import moment from "moment";

import Header from "common/components/Header/Header";
import TabPanel from "common/components/TabPanel/TabPanel";
import PostList from "common/components/PostList/PostList";
import FollowList from "common/components/FollowList/FollowList";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import posts from "mock/posts";
import profiles from "mock/userProfiles";
import users from "mock/users";
import UserInfo from "./UserInfo/UserInfo";

export default function Profile(): JSX.Element {
  const classes = useStyles();
  const profile = profiles[0];
  const [currentTab, setCurrentTab] = React.useState(0);
  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <div>
      <Header />

      <Box mt={12}>
        <Container maxWidth="sm">
          <Paper>
            <Box display="flex" justifyContent="center" color="primary" p={6}>
              <Typography
                className={classes.header}
                variant="h4"
                color="primary"
              >
                profile
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

              <Box mt={2}>
                <Divider />
              </Box>

              <Box display="flex">
                <Box display="flex" alignItems="center">
                  <Typography>{profile.status}</Typography>
                </Box>

                <IconButton color="secondary">
                  <Edit />
                </IconButton>
              </Box>

              <Box>
                <Link onClick={() => setShowInfo(!showInfo)}>
                  Show more information
                </Link>

                <Collapse in={showInfo}>
                  <Box mt={1}>
                    <UserInfo profile={profile} />
                  </Box>
                </Collapse>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={2}
              >
                <Paper style={{ width: "100%" }}>
                  <Tabs
                    value={currentTab}
                    onChange={(_, newValue: number) => setCurrentTab(newValue)}
                    variant="fullWidth"
                    centered
                  >
                    {["posts", "following", "followers"].map((x) => (
                      <Tab key={x} label={x.toUpperCase()} />
                    ))}
                  </Tabs>
                </Paper>

                <TabPanel value={currentTab} index={0}>
                  <Box py={2}>
                    <PostList data={posts} />
                  </Box>
                </TabPanel>

                <TabPanel value={currentTab} index={1}>
                  <Box py={2} display="flex">
                    <FollowList data={users} />
                  </Box>
                </TabPanel>

                <TabPanel value={currentTab} index={2}>
                  <Box py={2}>
                    <FollowList data={users} />
                  </Box>
                </TabPanel>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}
