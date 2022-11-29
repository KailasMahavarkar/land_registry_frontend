import { faAdd, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import defaultUsers from "../../data/users.data";
import produce from "immer";
import CustomContext from "../../context/custom.context";
import axios from "axios";
import {
	employeePermissionType,
	employeeRoleType,
	profileType,
	singleUserType,
} from "../../types/type";

const AdminUserManagement = () => {
	const { users, setUsers } = useContext(CustomContext);
	const [actions, setActions] = useState({
		add: false,
	});

	const [userType, setUserType] = useState<"admin" | "staff">("admin");

	const UserTableView = () => {
		return (
			<table className="table w-full">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => {
						return (
							<tr key={index}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => {
											Swal.fire({
												title: `Are you sure
                                            you want to delete this user?`,
												showDenyButton: true,
												showCancelButton: true,
												confirmButtonText: `Delete`,
												denyButtonText: `Don't delete`,
												confirmButtonColor: "blue",
											}).then((result) => {
												/* Read more about isConfirmed, isDenied below */
												if (result.isConfirmed) {
													const updatedUsers =
														users.filter(
															(u) =>
																u._id !==
																user._id
														);
													setUsers(updatedUsers);
													Swal.fire(
														"Deleted!",
														"",
														"success"
													);
												}
											});
										}}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	const NewUserForm = () => {
		const [newUser, setNewUser] = useState<singleUserType>({
			_id: "",
			role: "employee",
			name: "",
			email: "",
			permissions: {
				transfer: false,
				lease: false,
				split: false,
				merge: false,
				read: false,
			},
		});

		const handleAddUser = () => {
			axios.post("/employee/create", {
				username: "",
			});
		};

		return (
			<div className="flex flex-col items-center justify-center w-full">
				<div className="flex justify-center items-center shadow-md w-full ">
					<div className="flex flex-col shadow p-10 dark:border-[1px] dark:rounded-md">
						<h2 className="m-0 text-center ">New User Form</h2>
						{/* Full Name */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Name</span>
								<span className="label-text"></span>
							</label>
							<input
								type="email"
								className="input input-bordered"
								value={newUser.name}
								onChange={(e: any) => {
									setNewUser({
										...newUser,
										name: e.target.value,
									});
								}}
							/>
						</div>
						{/* Email */}
						<div className="form-control ">
							<label className="label">
								<span className="label-text">Email</span>
								<span className="label-text"></span>
							</label>
							<input
								type="email"
								className="input input-bordered"
								value={newUser.email}
								onChange={(e) => {
									setNewUser(
										produce(newUser, (draft) => {
											draft.email = e.target.value;
										})
									);
								}}
							/>
						</div>
						{/* select */}
						<div className="form-control ">
							<label className="label">
								<span className="label-text">User Type</span>
								<span className="label-text"></span>
							</label>
							{/* select */}
							<select
								className="input input-bordered"
								value={newUser.role}
								onChange={(e) => {
									setUserType(
										e.target.value as "admin" | "staff"
									);
									setNewUser(
										produce(newUser, (draft) => {
											draft.role = e.target
												.value as employeeRoleType;
										})
									);
								}}
							>
								<option value="admin">Admin</option>
								<option value="staff">Staff</option>
							</select>
						</div>
						{/* Access */}
						<div className="form-control">
							<label className="label cursor-pointer">
								<span className="label-text">Transfer</span>
								<input
									type="checkbox"
									checked={newUser.permissions.read}
									disabled={true}
									className="checkbox checkbox-primary"
									defaultChecked={true}
								/>
							</label>

							{[
								"transfer" as employeePermissionType,
								"lease" as employeePermissionType,
								"split" as employeePermissionType,
								"merge" as employeePermissionType,
								"read" as employeePermissionType,
							].map((permission: employeePermissionType) => {
								return (
									<label className="label cursor-pointer">
										<span className="label-text">
											{permission}
										</span>
										<input
											type="checkbox"
											checked={
												newUser.permissions[permission]
											}
											className="checkbox checkbox-primary"
											onChange={(e) => {
												setNewUser(
													produce(
														newUser,
														(draft) => {
															draft.permissions[
																permission
															] =
																e.target.checked;
														}
													)
												);
											}}
										/>
									</label>
								);
							})}
						</div>

						{/* Button */}
						<div className="form-control">
							<button
								className="btn btn-outline mt-4"
								onClick={() => {}}
							>
								Add New User
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full">
			{actions.add ? (
				<button
					className="btn btn-primary"
					onClick={() => setActions({ add: false })}
				>
					Go Back to Users
					<FontAwesomeIcon icon={faUsers} className="mx-2" />
				</button>
			) : (
				<button
					className="btn btn-primary"
					onClick={() => setActions({ add: true })}
				>
					Add New User
					<FontAwesomeIcon icon={faAdd} className="mx-2" />
				</button>
			)}

			{actions.add ? <NewUserForm /> : <UserTableView />}
		</div>
	);
};

export default AdminUserManagement;
