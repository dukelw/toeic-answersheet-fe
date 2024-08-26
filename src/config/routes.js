const routes = {
  updateAnswer: "/update/answer/:id",
  updateDocument: "/update/document/:id",
  updateSlider: "/update/slider/:id",
  getAnswer: "/answersheet/:id",
  addAnswer: "/test/add",
  addDocument: "/document/add",
  addSlider: "/slider/add",
  sliders: "/management/collection/:collection",
  signup: "/signup",
  signin: "/signin",
  managementAnswer: "/management/test",
  managementDocument: "/management/document",
  managementSlider: "/management/collection",
  managementUser: "/management/user",
  management: "/management",
  history: "/history",
  rankingDetail: "/ranking/:id",
  ranking: "/ranking",
  profile: "/profile/:id",
  account: "/account/:id",
  document: "/document",
  home: "/",
  notFound: "*"
};

export default routes;
