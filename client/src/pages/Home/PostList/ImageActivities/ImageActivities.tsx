import { Box } from "@material-ui/core";
import LikeButton from "components/Buttons/LikeButton/LikeButton";
import ShareButton from "components/Buttons/ShareButton/ShareButton";

interface ImageActivitiesProps {
  liked: boolean;
}

export default function ImageActivities({ liked }: ImageActivitiesProps) {
  return (
    <Box display="flex">
      <LikeButton active={liked} onClick={() => {}} />
      <ShareButton />
    </Box>
  );
}
