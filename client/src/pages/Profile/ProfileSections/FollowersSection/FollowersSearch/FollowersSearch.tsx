import React from "react";
import { TextField } from "@material-ui/core";
import useAppSelector from "hooks/useAppSelector";
import { actions, getLoading, getSearchText } from "../followersSectionSlice";
import useAppDispatch from "hooks/useAppDispatch";
import Progress from "components/Progress/Progress";

interface FollowersSearchProps {}

export default function FollowersSearch(props: FollowersSearchProps) {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector(getSearchText);

  const loading = useAppSelector(getLoading);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(actions.changeSearchText(event.target.value));
  }

  return (
    <TextField
      name="searchText"
      placeholder="Search by followers..."
      variant="outlined"
      value={searchText}
      onChange={handleOnChange}
      InputProps={{
        endAdornment: <>{loading && <Progress size={20} />}</>,
      }}
      fullWidth
    />
  );
}
