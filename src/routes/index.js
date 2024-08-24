import config from "../../src/config";

// Pages
import HomePage from "../pages/HomePage";
import CreateAnswer from "../pages/CreateAnswer";
import UpdateAnswer from "../pages/UpdateAnswer";
import ToeicForm from "../pages/ToeicForm";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const publicRoutes = [
  { path: config.routes.getAnswer, component: ToeicForm, layout: null },
  { path: config.routes.signin, component: Signin, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
  { path: config.routes.home, component: HomePage },
];

const privateRoutes = [
  {
    type: "admin",
    path: config.routes.addAnswer,
    component: CreateAnswer,
  },
  {
    type: "admin",
    path: config.routes.updateAnswer,
    component: UpdateAnswer,
  },
  // {
  //   type: "user",
  //   path: config.routes.payment,
  //   component: Payment,
  //   layout: HeaderNoLogo,
  // },
];

export { publicRoutes, privateRoutes };
