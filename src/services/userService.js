import axios from "../axios";
const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (userId) => {
  return axios.get(`/api/get-all-user?id=${userId}`);
};
const createNewUserService = (data) => {
  console.log(data);
  return axios.post(`/api/create-new-user`, data);
};
export { handleLogin, getAllUsers, createNewUserService };
