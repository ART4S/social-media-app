import React from "react";
import { Box } from "@material-ui/core";
import useStyles from "./useStyles";
import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";

interface UploadImageProps {
  url: string;
  deleteDisabled: boolean;
  onDelete(): void;
}

export default function UploadImage({
  url,
  deleteDisabled,
  onDelete,
}: UploadImageProps): JSX.Element {
  const classes = useStyles();

  return (
    <Box position="relative">
      <img className={classes.image} src={url} />

      {!deleteDisabled && (
        <Box position="absolute" top={0} right={0}>
          <DeleteButton onClick={onDelete} />
        </Box>
      )}
    </Box>
  );
}
