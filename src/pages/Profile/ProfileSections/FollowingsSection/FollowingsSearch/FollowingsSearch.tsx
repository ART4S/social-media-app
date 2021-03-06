import React from "react";
import { TextField } from "@material-ui/core";

import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import Progress from "components/Progress/Progress";

import { actions, getLoading, getSearchText } from "../followingsSectionSlice";

export default function FollowingsSearch(): JSX.Element {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector(getSearchText);

  const loading = useAppSelector(getLoading);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(actions.changeSearchText(event.target.value));
  }

  return (
    <TextField
      name="searchText"
      placeholder="Search by followings..."
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
