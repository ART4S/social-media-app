import React from "react";
import {
  Container,
  Box,
  Paper,
  Button,
  Avatar,
  Divider,
  IconButton,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Collapse,
  Tabs,
  Link,
  Tab,
} from "@material-ui/core";

import useStyles from "./useStyles";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {`© Copyright ${new Date().getFullYear()} `}
      <Link color="inherit">Social Media App</Link>
    </Typography>
  );
}
