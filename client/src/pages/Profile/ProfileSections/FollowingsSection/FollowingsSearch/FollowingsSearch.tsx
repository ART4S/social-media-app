import React from "react";
import { TextField } from "@material-ui/core";
import useAppSelector from "hooks/useAppSelector";
import { actions, getLoading, getSearchText } from "../followingsSectionSlice";
import useAppDispatch from "hooks/useAppDispatch";
import Progress from "components/Progress/Progress";

interface FollowingsSearchProps {}

export default function FollowingsSearch(props: FollowingsSearchProps) {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector(getSearchText);

  const loading = useAppSelector(getLoading);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(actions.changeSearchText(event.target.value));
  }

  return (
    <TextField
      id="searchText"
      placeholder="Search by followings..."
      value={searchText}
      onChange={handleOnChange}
      variant="outlined"
      InputProps={{
        endAdornment: <>{loading && <Progress size={20} />}</>,
      }}
      fullWidth
    />
  );
}
