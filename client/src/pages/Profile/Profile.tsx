import React from "react";
import { Container, Box, Paper, Divider, Link, Collapse } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

import Header from "components/Header/Header";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import PageProgress from "components/PageProgress/PageProgress";

import { actions, getLoaded } from "./profileSlice";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import MainInfo from "./MainInfo/MainInfo";
import Status from "./Status/Status";
import ProfileSections from "./ProfileSections/ProfileSections";

type ProfileParams = {
  userId: string;
};

export default function Profile(): JSX.Element {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const { userId } = useParams<ProfileParams>();

  const loaded = useAppSelector(getLoaded);

  React.useEffect(() => {
    if (!loaded) {
      dispatch(actions.fetchProfile(userId));
    }
  }, [userId, loaded]);

  // TODO: not fires when using backward/forward arrows inside browser window
  React.useEffect(() => history.listen(() => dispatch(actions.reset())), []);

  return loaded ? <PageContent /> : <PageProgress />;
}

function PageContent(): JSX.Element {
  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <div>
      <Header />

      <Box mt={12}>
        <Container maxWidth="sm">
          <Paper>
            <Box display="flex" flexDirection="column" px={3} pt={6}>
              <MainInfo />

              <Box mt={2}>
                <Divider />
              </Box>

              <Status />

              <Box my={1}>
                <Link style={{ cursor: "pointer" }} onClick={() => setShowInfo(!showInfo)}>
                  {showInfo ? "Hide" : "Show"}
                  {' '}
                  more information
                </Link>
              </Box>

              <Collapse in={showInfo}>
                <Box mt={1}>
                  <AdditionalInfo />
                </Box>
              </Collapse>

              <Box display="flex" justifyContent="center" mt={2}>
                <ProfileSections />
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}
