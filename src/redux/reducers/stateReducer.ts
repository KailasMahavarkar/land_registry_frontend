import ActionTypes from "../actions/ActionTypes";
import produce from "immer";
import { profileType } from "../../types/type";

const defaultProfile: profileType = {
	_id: "",
	username: "",
	fullname: "",
	email: "",
	role: "employee",
	apikey: "",
	datejoined: "",
	status: "active",
	accessToken: "",
	refreshToken: "",
};

export const stateReducer = (
	state: profileType = defaultProfile,
	action: any
) => {
	switch (action.type) {
		case ActionTypes.ADD_LOGIN:
			return action.payload;

		case ActionTypes.REMOVE_LOGIN:
			return defaultProfile;

		default:
			return state;
	}
};
