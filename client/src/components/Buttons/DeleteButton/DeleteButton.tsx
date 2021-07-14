import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteButton(
  props: React.ComponentProps<typeof IconButton>,
): JSX.Element {
  return (
    <IconButton {...props}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
}
