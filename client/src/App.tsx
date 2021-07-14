import React from "react";
import { CssBaseline } from "@material-ui/core";

import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import ProfileEditor from "pages/ProfileEditor/ProfileEditor";
import Login from "pages/Login/Login";
import Registration from "pages/Registration/Registration";

import { users } from "mock/data/users";

function App(): JSX.Element {
  return (
    <div>
      <CssBaseline />
      {/* <Registration /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      <Profile userId={users[0].id} />
      {/* <ProfileEditor /> */}
    </div>
  );
}

export default App;
