import config from "../../src/config";

// Pages
import HomePage from "../pages/HomePage";
import CreateAnswer from "../pages/CreateAnswer";
import UpdateAnswer from "../pages/UpdateAnswer";
import ToeicForm from "../pages/ToeicForm";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Answers from "../pages/Answers";
import Documents from "../pages/Documents";
import Ranking from "../pages/Ranking";
import RankingDetail from "../pages/RankingDetail";
import History from "../pages/History";
import Profile from "../pages/Profile";
import Account from "../pages/Account";
import Document from "../pages/Document";
import CreateDocument from "../pages/CreateDocument";
import UpdateDocument from "../pages/UpdateDocument";
import Management from "../pages/Management";
import CreateSlider from "../pages/CreateSlider";
import Collections from "../pages/Collections";
import Sliders from "../pages/Sliders";
import Users from "../pages/Users";
import UpdateSlider from "../pages/UpdateSlider";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";
import Guide from "../pages/Guide";

const publicRoutes = [
  { path: config.routes.getAnswer, component: ToeicForm, layout: null },
  { path: config.routes.signin, component: Signin, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
  { path: config.routes.home, component: HomePage },
  { path: config.routes.ranking, component: Ranking },
  { path: config.routes.rankingDetail, component: RankingDetail },
  { path: config.routes.history, component: History },
  { path: config.routes.document, component: Document },
  { path: config.routes.notFound, component: NotFound },
  { path: config.routes.test, component: Test },
  { path: config.routes.guide, component: Guide },
];

const privateRoutes = [
  {
    type: "admin",
    path: config.routes.management,
    component: Management,
  },
  {
    type: "admin",
    path: config.routes.addAnswer,
    component: CreateAnswer,
  },
  {
    type: "admin",
    path: config.routes.addDocument,
    component: CreateDocument,
  },
  {
    type: "admin",
    path: config.routes.addSlider,
    component: CreateSlider,
  },
  {
    type: "admin",
    path: config.routes.updateSlider,
    component: UpdateSlider,
  },
  {
    type: "admin",
    path: config.routes.managementSlider,
    component: Collections,
  },
  {
    type: "admin",
    path: config.routes.sliders,
    component: Sliders,
  },
  {
    type: "admin",
    path: config.routes.updateAnswer,
    component: UpdateAnswer,
  },
  {
    type: "admin",
    path: config.routes.updateDocument,
    component: UpdateDocument,
  },
  {
    type: "admin",
    path: config.routes.managementAnswer,
    component: Answers,
  },
  {
    type: "admin",
    path: config.routes.managementUser,
    component: Users,
  },
  {
    type: "admin",
    path: config.routes.managementDocument,
    component: Documents,
  },
  {
    type: "admin",
    path: config.routes.profile,
    component: Profile,
  },
  {
    type: "admin",
    path: config.routes.account,
    component: Account,
  },
  {
    type: "user",
    path: config.routes.account,
    component: Account,
  },
  {
    type: "user",
    path: config.routes.profile,
    component: Profile,
  },
];

export { publicRoutes, privateRoutes };
