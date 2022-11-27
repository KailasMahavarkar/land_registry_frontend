import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import CustomContext from "../../context/custom.contex";
import defaultUsers from "../../data/users.data";
import customToast from "../../toast";

const RootAccessControl = () => {
	const { users, setUsers } = useContext(CustomContext);

	const permissionChangeHandler = (e: any, id: number) => {
		const { name, checked } = e.target;
		const updatedUsers = users.map((user) => {
			if (user.id === id) {
				return {
					...user,
					permissions: {
						...user.permissions,
						[name]: checked,
					},
				};
			}
			return user;
		});
		setUsers(updatedUsers);
	};

	return (
		<div>
			{/* role management table */}
			<div className="flex flex-col items-center justify-center w-full">
				<table className="table w-full">
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Read</th>
							<th>Write</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr>
									<td>{user.id}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.role}</td>

									{/* read permission */}
									<td>
										<input
											type="checkbox"
											name="read"
											checked={user.permissions.read}
											className="checkbox checkbox-primary"
											onChange={(e) => {
												permissionChangeHandler(
													e,
													user.id
												);
											}}
										/>
									</td>

									{/* write permission */}
									<td>
										<input
											type="checkbox"
											name="write"
											checked={user.permissions.write}
											className="checkbox checkbox-primary"
											onChange={(e) => {
												permissionChangeHandler(
													e,
													user.id
												);
											}}
										/>
									</td>

									{/* delete permission */}
									<td>
										<input
											type="checkbox"
											name="delete"
											checked={user.permissions.delete}
											className="checkbox checkbox-primary"
											onChange={(e) => {
												permissionChangeHandler(
													e,
													user.id
												);
											}}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className="flex justify-end w-full ">
					<button
						className="btn btn-success btn-sm mx-5"
						onClick={() => {
							customToast({
								icon: "info",
								message: "syncing successful",
							});
						}}
					>
						Sync Changes
						<FontAwesomeIcon className="m-2" icon={faSync} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default RootAccessControl;
