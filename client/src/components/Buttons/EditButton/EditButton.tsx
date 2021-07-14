import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

export default function EditButton(
  props: React.ComponentProps<typeof IconButton>,
): JSX.Element {
  return (
    <IconButton {...props}>
      <EditIcon color="secondary" />
    </IconButton>
  );
}
