import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";
import useAppSelector from "hooks/useAppSelector";
import { getProfile } from "../profileSlice";

type DialogProps = React.ComponentProps<typeof Dialog>;

type DeleteProfileDialogProps = Omit<DialogProps, "onClose"> & {
  onClose: () => void;
};

export default function DeleteProfileDialog(
  props: DeleteProfileDialogProps,
): JSX.Element {
  const email = useAppSelector((state) => getProfile(state).email);

  const [emailConfirm, setEmailConfirm] = React.useState("");

  return (
    <Dialog {...props}>
      <DialogTitle>Are you sure you want to delete your profile?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          To confirm your action, please enter your email address here
        </DialogContentText>

        <TextField
          id="email"
          label="Email Address"
          type="email"
          margin="dense"
          value={emailConfirm}
          onChange={(e) => setEmailConfirm(e.target.value)}
          fullWidth
          autoFocus
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="primary" onClick={props.onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={email !== emailConfirm}
          onClick={props.onClose}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
