import React from "react";
import { CssBaseline } from "@material-ui/core";

import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import ProfileEditor from "pages/ProfileEditor/ProfileEditor";
import Login from "pages/Login/Login";
import Registration from "pages/Registration/Registration";
import ImageViewer from "components/ImageViewer/ImageViewer";
import IImage from "model/ImageDto";
import faker from "faker";

const images: IImage[] = Array.from(Array(10)).map(() => ({
  id: faker.datatype.uuid(),
  authorId: faker.datatype.uuid(),
  authorAvatarUrl: faker.internet.avatar(),
  authorFirstName: faker.name.firstName(),
  authorLastName: faker.name.lastName(),
  createDate: faker.date.recent(),
  likeCount: 2,
  shareCount: 3,
  liked: faker.datatype.boolean(),
  url: faker.image.image(),
}));

function App(): JSX.Element {
  return (
    <div>
      <CssBaseline />
      {/* <Registration /> */}
      {/* <Login /> */}
      {/* <Profile /> */}
      {/* <ProfileEditor /> */}
      <Home />
    </div>
  );
}

export default App;
