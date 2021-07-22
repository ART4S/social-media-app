import React from "react";
import { Box } from "@material-ui/core";

import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";

import useStyles from "./useStyles";

type UploadImageProps = {
  url: string;
  deleteDisabled: boolean;
  onDelete: () => void;
};

export default function UploadImage({
  url,
  deleteDisabled,
  onDelete,
}: UploadImageProps): JSX.Element {
  const classes = useStyles();

  return (
    <Box position="relative" width="100%" height="100%">
      <img className={classes.image} src={url} />

      {!deleteDisabled && (
        <Box position="absolute" top={0} right={0}>
          <DeleteButton onClick={onDelete} />
        </Box>
      )}
    </Box>
  );
}
