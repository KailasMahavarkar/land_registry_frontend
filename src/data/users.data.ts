import { singleUserType } from './../context/custom.contex';
const defaultUsers: singleUserType[] = [
	{
		id: 125,
		name: "john",
		email: "john@eland.gov.in",
		role: "admin",
		permissions: {
			read: true,
			write: true,
			delete: true,
		},
	},
	{
		id: 224,
		name: "jane",
		email: "jane@eland.gov.in",
		role: "admin",
		permissions: {
			read: true,
			write: true,
			delete: false,
		},
	},
	{
		id: 325,
		name: "joe",
		email: "joe@eland.gov.in",
		role: "admin",
		permissions: {
			read: true,
			write: false,
			delete: false,
		},
	},
];

export default defaultUsers;
