import config from "../../src/config";

// Pages
import HomePage from "../pages/HomePage";
import CreateAnswer from "../pages/CreateAnswer";
import UpdateAnswer from "../pages/UpdateAnswer";
import ToeicForm from "../pages/ToeicForm";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Answers from "../pages/Answers";
import Ranking from "../pages/Ranking";
import RankingDetail from "../pages/RankingDetail";
import History from "../pages/History";

const publicRoutes = [
  { path: config.routes.getAnswer, component: ToeicForm, layout: null },
  { path: config.routes.signin, component: Signin, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
  { path: config.routes.home, component: HomePage },
  { path: config.routes.ranking, component: Ranking },
  { path: config.routes.rankingDetail, component: RankingDetail },
  { path: config.routes.history, component: History },
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
  {
    type: "admin",
    path: config.routes.answers,
    component: Answers,
  },
  // {
  //   type: "user",
  //   path: config.routes.payment,
  //   component: Payment,
  //   layout: HeaderNoLogo,
  // },
];

export { publicRoutes, privateRoutes };
