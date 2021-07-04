import { Box } from "@material-ui/core";
import LikeButton from "components/Buttons/LikeButton/LikeButton";
import ShareButton from "components/Buttons/ShareButton/ShareButton";

type ActivitiesProps = {
  liked: boolean;
};

export default function ImageActivities({ liked }: ActivitiesProps) {
  return (
    <Box display="flex">
      <LikeButton active={liked} />
      <ShareButton />
    </Box>
  );
}
