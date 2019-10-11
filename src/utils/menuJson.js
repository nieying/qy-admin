export const menuJson = [
  {
    key: "/dialect",
    title: "方言管理",
    icon: "highlight",
    subs: [
      { key: "/dialect/type", title: "方言分类", component: "DialectType" },
      { key: "/dialect/list", title: "方言列表", component: "Dialect" }
    ]
  },
  {
    key: "/unit",
    title: "单元管理",
    icon: "hdd",
    component: "Unit"
  },
  {
    key: "/course",
    title: "课程管理",
    icon: "project",
    component: "Course"
  },
  {
    key: "/topic",
    title: "题目管理",
    icon: "container",
    component: "Topic"
    // subs: [
    //   { key: "/subject/listen", title: "听力题", component: "Listen" },
    //   {
    //     key: "/subject/security",
    //     title: "防伪标题",
    //     component: "Security"
    //   },
    //   { key: "/subject/picture", title: "看图题", component: "Picture" }
    // ]
  },
  {
    key: "/notes",
    title: "注释管理",
    icon: "number",
    component: "Notes"
  },
  {
    key: "/vip",
    title: "会员管理",
    icon: "gitlab",
    component: "Vip"
  },
  {
    key: "/user",
    title: "用户管理",
    icon: "user",
    component: "User"
  },
  {
    key: "/role",
    title: "角色管理",
    icon: "usergroup-add",
    component: "Role"
  },
  {
    key: "/union",
    title: "协会管理",
    icon: "interaction",
    component: "Union"
  },
  {
    key: "/activity",
    title: "活动管理",
    icon: "exception",
    component: "Activity"
  },
  {
    key: "/feedback",
    title: "反馈管理",
    icon: "message",
    component: "Feedback"
  },
  {
    key: "/ad",
    title: "广告管理",
    icon: "wallet",
    component: "Ad"
  },
  {
    key: "/startUp",
    title: "启动页管理",
    icon: "robot",
    component: "StartUp"
  },
  {
    key: "/achieve",
    title: "成就管理",
    icon: "code-sandbox",
    component: "Achieve"
  },

];
