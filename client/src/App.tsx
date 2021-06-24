import React from "react";
import { CssBaseline } from "@material-ui/core";
import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";

function App(): JSX.Element {
  return (
    <div>
      <CssBaseline />
      {/* <Home /> */}
      <Profile />
    </div>
  );
}

export default App;
