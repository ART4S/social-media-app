import React from "react";
import { CssBaseline } from "@material-ui/core";

import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import ProfileEditor from "pages/ProfileEditor/ProfileEditor";
import Login from "pages/Login/Login";

function App(): JSX.Element {
  return (
    <div>
      <CssBaseline />
      <Login />
      {/* <Profile />
      <ProfileEditor />
      <Home /> */}
    </div>
  );
}

export default App;
