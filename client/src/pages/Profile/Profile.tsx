import React from "react";
import {
  Container,
  Box,
  Paper,
  Divider,
  Link,
  Collapse,
} from "@material-ui/core";

import Header from "components/Header/Header";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import useAppSelector from "hooks/useAppSelector";
import { actions, getLoading } from "./profileSlice";
import useAppDispatch from "hooks/useAppDispatch";
import PageProgress from "components/PageProgress/PageProgress";
import MainInfo from "./MainInfo/MainInfo";
import Status from "./Status/Status";
import ProfileSections from "./ProfileSections/ProfileSections";
import { useHistory, useParams } from "react-router-dom";

interface ProfileParams {
  userId: string;
}

export default function Profile() {
  const dispatch = useAppDispatch();

  const { userId } = useParams<ProfileParams>();

  const loading = useAppSelector(getLoading);

  React.useEffect(() => {
    dispatch(actions.fetchProfile(userId));
  }, [userId]);

  return loading ? <PageProgress /> : <PageContent />;
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
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowInfo(!showInfo)}
                >
                  {showInfo ? "Hide" : "Show"} more information
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
