import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodes,
  createNewUserService,
  updateUserService,
  getAllUsers,
  deleteUserService,
  getAllDoctors,
} from "../../services/userService";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodes("gender");
      if (res && res.errCode === null) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderSuccess = (data) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: data,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
/*POSITION*/
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodes("Position");
      if (res && res.errCode === null) {
        dispatch({ type: actionTypes.FETCH_POSITION_SUCCESS, data: res.data });
      } else {
        dispatch({ type: actionTypes.FETCH_POSITION_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_POSITION_FAILED });
    }
  };
};

/*ROLE*/
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodes("Role");
      if (res && res.errCode === null) {
        dispatch({ type: actionTypes.FETCH_ROLE_SUCCESS, data: res.data });
      } else {
        dispatch({ type: actionTypes.FETCH_ROLE_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ROLE_FAILED });
    }
  };
};

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      //console.log(res.data);
      if (res && res.errCode === null) {
        dispatch({
          type: actionTypes.FETCH_ALL_USER_SUCCESS,
          data: res.data.reverse(),
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_USER_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ALL_USER_FAILED });
    }
  };
};
export const deleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      //console.log(res.data);
      if (res && res.errCode === null) {
        toast.success("User deleted successfully");
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete user is failed");
        dispatch({
          type: actionTypes.DELETE_USER_FAILED,
        });
      }
    } catch (error) {
      toast.error("Delete user is failed");
      dispatch({ type: actionTypes.DELETE_USER_FAILED });
    }
  };
};
export const createNewUser = (newUser) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(newUser);
      if (res && res.errCode === null) {
        toast.success("User created successfully");
        dispatch({ type: actionTypes.CREATE_USER_SUCCESS });
      } else {
        toast.warn("Create user failed");
        dispatch({ type: actionTypes.CREATE_USER_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_USER_FAILED });
    }
  };
};

export const updateUser = (newUser) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateUserService(newUser);
      if (res && res.errCode === null) {
        toast.success("User updated successfully");
        dispatch({ type: actionTypes.UPDATE_USER_SUCCESS });
      } else {
        toast.warn("Update user failed");
        dispatch({ type: actionTypes.UPDATE_USER_FAILED });
      }
    } catch (error) {
      toast.error("Update user failed");
      dispatch({ type: actionTypes.UPDATE_USER_FAILED });
    }
  };
};

export const fetchAllDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors(10);
      if (res && res.errCode === null) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          data: res.data.reverse(),
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
    }
  };
};
