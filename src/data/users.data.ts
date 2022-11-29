import { singleUserType } from "../types/type";

const defaultUsers: singleUserType[] = [
	{
		_id: "125",
		name: "john",
		email: "john@eland.gov.in",
		role: "admin",
		permissions: {
			read: true,
			merge: true,
			split: true,
			lease: true,
            transfer: true,
		},
	},
	{
		_id: "224",
		name: "jane",
		email: "jane@eland.gov.in",
		role: "admin",
		permissions: {
			read: true,
			merge: true,
			split: true,
			lease: true,
            transfer: true,
		},
	},
	{
		_id: "325",
		name: "joe",
		email: "joe@eland.gov.in",
		role: "admin",
		permissions: {
			read: true,
			merge: true,
			split: false,
			lease: false,
            transfer: false,
		},
	},
];

export default defaultUsers;
