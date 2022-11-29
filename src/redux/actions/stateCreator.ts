import { profileType } from "./../../types/type";
import ActionTypes from "./ActionTypes";

export const addLogin = (payload: profileType) => {
	return {
		type: ActionTypes.ADD_LOGIN,
		payload: payload,
	};
};

export const removeLogin = () => {
	return {
		type: ActionTypes.REMOVE_LOGIN,
		payload: {},
	};
};
