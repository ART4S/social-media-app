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
import { actions, getLoading } from "./profileCommonSlice";
import useAppDispatch from "hooks/useAppDispatch";
import PageProgress from "components/PageProgress/PageProgress";
import Title from "./Title/Title";
import MainInfo from "./MainInfo/MainInfo";
import Status from "./Status/Status";
import ProfileSections from "./ProfileSections/ProfileSections";

interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const loading = useAppSelector(getLoading);

  const dispatch = useAppDispatch();

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
            <Box display="flex" justifyContent="center" color="primary" p={6}>
              <Title />
            </Box>

            <Box display="flex" flexDirection="column" mx={3}>
              <MainInfo />

              <Box mt={2}>
                <Divider />
              </Box>

              <Status />

              <Box my={2}>
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowInfo(!showInfo)}
                >
                  Show more information
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
