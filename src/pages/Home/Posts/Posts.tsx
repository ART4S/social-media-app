import React from "react";
import { Grid, GridSpacing } from "@material-ui/core";
import postAPI from "api/postAPI";
import Post from "../Post/Post";
import IPost from "model/Post";

const SPACING: GridSpacing = 2;

export default function Posts() {
  const [data, setData] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    let active = true;

    (async () => {
      const posts: IPost[] = await postAPI.getAll();
      if (active) {
        setData(posts);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Grid container spacing={SPACING} direction="column">
      {data.map((x) => (
        <Grid item>
          <Post data={x} />
        </Grid>
      ))}
    </Grid>
  );
}
