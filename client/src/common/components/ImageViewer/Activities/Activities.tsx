import { Box } from "@material-ui/core";
import LikeButton from "common/components/Buttons/LikeButton/LikeButton";
import ShareButton from "common/components/Buttons/ShareButton/ShareButton";

type ActivitiesProps = {
  liked: boolean;
};

export default function Activities({ liked }: ActivitiesProps) {
  return (
    <Box display="flex">
      <LikeButton active={liked} />
      <ShareButton />
    </Box>
  );
}
