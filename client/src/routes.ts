import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import ProfileEditor from "pages/ProfileEditor/ProfileEditor";
import Login from "pages/Login/Login";
import Registration from "pages/Registration/Registration";
import NotFound from "pages/NotFound/NotFound";
// "homepage": "https://art4s.github.io/social-media-app",
interface Route {
  path: string;
  component: React.ComponentType<any>;
  protected?: boolean;
  exact?: boolean;
}

const routes: Route[] = [
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/registration",
    component: Registration,
    exact: true,
  },
  {
    path: "/",
    component: Home,
    exact: true,
    protected: true,
  },
  {
    path: "/:userId",
    component: Profile,
    protected: true,
    exact: true,
  },
  {
    path: "/:userId/edit",
    component: ProfileEditor,
    protected: true,
    exact: true,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export default routes;
