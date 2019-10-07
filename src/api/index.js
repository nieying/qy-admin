import axios from "axios";

// 登入
export const login = data => {
  return axios.post("/auth/login", data);
};
// 获取登入用户信息
export const adminInfo = data => {
  return axios.post("/auth/info", data);
};
// 退出
export const logout = data => {
  return axios.post("/auth/logout", data);
};

// 文件、图片上传
export const uploadFile = data => {
  return axios.post("/storage/create", data);
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
/** 课程管理 */
export const getCourse = params => {
  return axios.get("/course/list", { params });
};
export const createCourse = data => {
  return axios.post("/course/create", data);
};
export const updateCourse = data => {
  return axios.post("/course/update", data);
};
export const deleteCourse = data => {
  return axios.post("/course/delete", data);
};
/** 广告管理 */
export const getAdvert = params => {
  return axios.get("/advert/list", { params });
};
export const createAdvert = data => {
  return axios.post("/advert/create", data);
};
export const updateAdvert = data => {
  return axios.post("/advert/update", data);
};
export const deleteAdvert = data => {
  return axios.post("/advert/delete", data);
};
/** 题目管理 */
export const getSubject = params => {
  return axios.get("/subject/list", { params });
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
export const createAnswer = data => {
  return axios.post("/subject/answer/create", data);
};
export const updateAnswer = data => {
  return axios.post("/subject/answer/update", data);
};
export const deleteAnswer = data => {
  return axios.post("/subject/answer/delete", data);
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
