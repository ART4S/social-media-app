import React from "react";
import { Box, TextField, Button } from "@material-ui/core";
import useAppSelector from "hooks/useAppSelector";
import { actions, getProfile } from "pages/Profile/profileSlice";
import useAppDispatch from "hooks/useAppDispatch";

interface EditStatusProps {
  onClose(): void;
}

export default function EditStatus({ onClose }: EditStatusProps): JSX.Element {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => getProfile(state).status);

  const [text, setText] = React.useState(status ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const oldStatus = (status ?? "").trim();
    const newStatus = text.trim();

    if (oldStatus !== newStatus) {
      dispatch(actions.setStatus(newStatus));
    }

    onClose();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column">
        <TextField
          id="text"
          name="text"
          variant="outlined"
          rows={4}
          rowsMax={5}
          value={text}
          onChange={handleChange}
          inputProps={{
            maxLength: 200,
          }}
          multiline
          fullWidth
        />

        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Box display="flex">
            <Button variant="outlined" color="primary" onClick={onClose}>
              cancel
            </Button>

            <Box ml={2}>
              <Button type="submit" variant="contained" color="primary">
                add
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
