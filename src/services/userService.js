import axios from "../axios";
const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (userId) => {
  return axios.get(`/api/get-all-user?id=${userId}`);
};
const createNewUserService = (data) => {
  //console.log(data);
  return axios.post(`/api/create-new-user`, data);
};
const updateUserService = (data) => {
  // console.log(data);
  return axios.put(`/api/update-user`, data);
};
const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};
const getAllCodes = (inputType) => {
  return axios.get(`/api/getAllCode?type=${inputType}`);
};
const getAllDoctors = (inputLimit) => {
  let api = `/api/getAllDoctor?limit=${inputLimit}`;
  return axios.get(api);
};
export {
  handleLogin,
  getAllUsers,
  createNewUserService,
  updateUserService,
  deleteUserService,
  getAllCodes,
  getAllDoctors,
};
