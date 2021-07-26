import React from "react";
import { Avatar as MuiAvatar } from "@material-ui/core";
import { PhotoCameraOutlined } from "@material-ui/icons";

export default function Avatar(props: React.ComponentProps<typeof MuiAvatar>): JSX.Element {
  return (
    <MuiAvatar {...props}>
      <PhotoCameraOutlined />
    </MuiAvatar>
  );
}
