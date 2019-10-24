import axios from "axios";

// 登入
export const login = data => {
  return axios.post("/auth/login", data);
};
// 获取登入用户信息
export const adminInfo = params => {
  return axios.get("/auth/info", { params });
};
// 退出
export const logout = data => {
  return axios.post("/auth/logout", data);
};

// 文件、图片上传
export const uploadFile = data => {
  return axios.post("/storage/create", data);
};

// 菜单权限
export const getMenu = params => {
  return axios.get("/menu/names", { params });
};
// export const createMenu = data => {
//   return axios.post("/languageClass/create", data);
// };
// export const updateMenu = data => {
//   return axios.post("/languageClass/update", data);
// };
// export const deleteMenu = data => {
//   return axios.post("/languageClass/delete", data);
// };

/** 方言分类 */
export const getDialectType = params => {
  return axios.get("/languageClass/list", { params });
};
export const createDialectType = data => {
  return axios.post("/languageClass/create", data);
};
export const updateDialectType = data => {
  return axios.post("/languageClass/update", data);
};
export const deleteDialectType = data => {
  return axios.post("/languageClass/delete", data);
};
/** 方言管理 */
export const getDialect = params => {
  return axios.get("/language/list", { params });
};
export const createDialect = data => {
  return axios.post("/language/create", data);
};
export const updateDialect = data => {
  return axios.post("/language/update", data);
};
export const deleteDialect = data => {
  return axios.post("/language/delete", data);
};
/** 单元管理 */
export const getUnit = params => {
  return axios.get("/unit/list", { params });
};
export const createUnit = data => {
  return axios.post("/unit/create", data);
};
export const updateUnit = data => {
  return axios.post("/unit/update", data);
};
export const deleteUnit = data => {
  return axios.post("/unit/delete", data);
};
export const getUnitByLanguage = params => {
  return axios.get("/unit/list/language", {params});
};

/** 题目管理 */
export const getSubject = params => {
  return axios.get("/subject/list", { params });
};
export const getSubjectInfo = params => {
  return axios.get("/subject/info", { params });
};
export const createSubject = data => {
  return axios.post("/subject/create", data);
};
export const updateSubject = data => {
  return axios.post("/subject/update", data);
};
export const deleteSubject = data => {
  return axios.post("/subject/delete", data);
};
export const getAnswer = params => {
  return axios.get("/subject/answer/list", { params });
};
export const updateAnswer = data => {
  return axios.post("/subject/answer/update", data);
};
export const deleteAnswer = data => {
  return axios.post("/subject/answer/delete", data);
};

/** 广告管理 */
export const getAdvert = params => {
  return axios.get("/ad/list", { params });
};
export const createAdvert = data => {
  return axios.post("/ad/create", data);
};
export const updateAdvert = data => {
  return axios.post("/ad/update", data);
};
export const deleteAdvert = data => {
  return axios.post("/ad/delete", data);
};

/** 系统管理 - 角色管理*/
export const getAdmin = params => {
  return axios.get("/admin/list", { params });
};
export const readAdmin = params => {
  return axios.post("/admin/read", { params });
};
export const createAdmin = data => {
  return axios.post("/admin/create", data);
};
export const updateAdmin = data => {
  return axios.post("/admin/update", data);
};
export const deleteAdmin = data => {
  return axios.post("/admin/delete", data);
};

/** 活动管理*/
export const getActivity = params => {
  return axios.get("/activity/list", { params });
};
export const readActivity = params => {
  return axios.get("/activity/info", { params });
};
export const createActivity = data => {
  return axios.post("/activity/create", data);
};
export const updateActivity = data => {
  return axios.post("/activity/update", data);
};
export const deleteActivity = data => {
  return axios.post("/activity/delete", data);
};
/** 反馈管理*/
export const getFeedback = params => {
  return axios.get("/feedback/list", { params });
};

/** 注释管理*/
export const getNotes = params => {
  return axios.get("/notes/list", { params });
};
export const createNotes = data => {
  return axios.post("/notes/create", data);
};
export const updateNotes = data => {
  return axios.post("/notes/update", data);
};
export const deleteNotes = data => {
  return axios.post("/notes/delete", data);
};

/** 协会管理*/
export const getOrganize = params => {
  return axios.get("/organize/list", { params });
};
export const createOrganize = data => {
  return axios.post("/organize/create", data);
};
export const updateOrganize = data => {
  return axios.post("/organize/update", data);
};
export const deleteOrganize = data => {
  return axios.post("/organize/delete", data);
};
/** 启动页管理*/
export const getStartup = params => {
  return axios.get("/startup/list", { params });
};
export const createStartup = data => {
  return axios.post("/startup/create", data);
};
export const updateStartup = data => {
  return axios.post("/startup/update", data);
};
export const deleteStartup = data => {
  return axios.post("/startup/delete", data);
};

/** 用户-会员管理*/
export const getUsers = params => {
  return axios.get("/user/list", { params });
};
export const getVipUsers = params => {
  return axios.get("/user/vip/list", { params });
};
/** 成就管理*/
export const getGardeList = params => {
  return axios.get("/config/grade/list", { params });
};
export const getGardeInfo = params => {
  return axios.get("/config/grade/info", { params });
};
export const updateGarde = data => {
  return axios.post("/config/grade", data);
};




