import React from "react";
import {
  Paper,
  Avatar,
  Box,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { PhotoCameraOutlined } from "@material-ui/icons";
import { debounce } from "lodash";

interface SearchBarProps {
  placeholder: string;
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export default function SearchBar({
  placeholder,
  searchText,
  onSearchTextChange,
}: SearchBarProps) {
  const [value, setValue] = React.useState("");

  const onSearchTextChangeDebounced = React.useCallback(
    debounce((newValue: string) => {
      onSearchTextChange(newValue);
    }, 400),
    [],
  );

  React.useEffect(() => {
    setValue(searchText);
  }, [searchText]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setValue(value);
    onSearchTextChangeDebounced(value);
  }

  return (
    <TextField
      id="searchText"
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      variant="outlined"
      fullWidth
    />
  );
}
