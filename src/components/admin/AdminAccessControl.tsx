import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useContext, useState } from "react";
import CustomContext from "../../context/custom.context";
import customToast from "../../toast";
import { employeePermissionType } from "../../types/type";

const RootAccessControl = () => {
	const { users, setUsers } = useContext(CustomContext);

	const permissionChangeHandler = (e: any, id: string) => {
		const { name, checked } = e.target;
		const updatedUsers = users.map((user) => {
			if (user._id === id) {
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
		setUsers(
            produce(users, (draft) => {
                return draft.map((user) => {
                    if (user._id === id) {
                        user.permissions[name as employeePermissionType] = checked;
                    }
                    return user;
                })
            })
        );
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
							<th>Split</th>
							<th>Merge</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr>
									<td>{user._id}</td>
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
													user._id
												);
											}}
										/>
									</td>

									{/* split permission */}
									<td>
										<input
											type="checkbox"
											name="split"
											checked={user.permissions.split}
											className="checkbox checkbox-primary"
											onChange={(e) => {
												permissionChangeHandler(
													e,
													user._id
												);
											}}
										/>
									</td>

                                    {/* merge permission */}
									<td>
										<input
											type="checkbox"
											name="merge"
											checked={user.permissions.merge}
											className="checkbox checkbox-primary"
											onChange={(e) => {
												permissionChangeHandler(
													e,
													user._id
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
