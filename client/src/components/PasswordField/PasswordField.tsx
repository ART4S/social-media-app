import React from "react";
import { IconButton, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

type PasswordFieldProps = React.ComponentProps<typeof TextField>;

export default function PasswordField(props: PasswordFieldProps): JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextField
      autoComplete="current-password"
      variant="outlined"
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        // eslint-disable-next-line react/destructuring-assignment
        ...props.InputProps,
        endAdornment: (
          <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        ),
      }}
    />
  );
}
