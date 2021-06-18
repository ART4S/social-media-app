import React from "react";
import { Grid, useTheme } from "@material-ui/core";
import Header from "common/components/Header/Header";
import Posts from "./Posts/Posts";

export default function Home(): JSX.Element {
  const theme = useTheme();

  return (
    <div>
      <Header />

      <div style={{ padding: theme.spacing(10) }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Posts />
          </Grid>

          <Grid item xs={6}>
            {""}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
