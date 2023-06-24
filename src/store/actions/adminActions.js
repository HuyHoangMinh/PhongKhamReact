import actionTypes from "./actionTypes";
import { getAllCodes } from "../../services/userService";

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
