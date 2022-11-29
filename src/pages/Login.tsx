import { useContext, useState } from "react";
import axios from "axios";
import customToast from "../toast";
import { sha512 } from "js-sha512";
import produce from "immer";
import { useNavigate } from "react-router-dom";
import CustomContext from "../context/custom.context";
import { parseJwt } from "../helper";
import { useDispatch } from "react-redux";
import { addLogin } from "../redux/actions/stateCreator";
import { profileType } from "../types/type";

// profile form
const LoginForm = () => {
	// profile form state
	const [user, setUser] = useState({
		username: "",
		password: "",
	});
	// const [userType, setUserType] = useState<"admin" | "employee">("employee");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const formSubmitHandler = async () => {
		try {
			const result = await axios.post("/auth/login", {
				username: user.username,
				password: sha512(user.password).toString(),
			});

			if (result.data.status === "success") {
				customToast({
					icon: "success",
					message: "Login Success",
				});
			}
			const tokens = result.data.data;

			if (tokens) {
				const temp = parseJwt(tokens.accessToken) as profileType;

				dispatch(
					addLogin({
						...temp,
						accessToken: tokens.accessToken,
						refreshToken: tokens.refreshToken,
					})
				);

				if (temp.role === "admin") {
					navigate("/admin-dashboard");
				} else {
					navigate("/dashboard");
				}
			}
		} catch (error: any) {
			if (error.response?.data?.msg === "profile already updated") {
				return customToast({
					icon: "info",
					message: "Profile already updated",
				});
			}

			return customToast({
				icon: "error",
				message: error.response?.data?.msg,
			});
		}
	};

	return (
		<div className="flex justify-center items-center shadow-md w-full ">
			<div className="flex flex-col shadow p-10 dark:border-[1px] dark:rounded-md">
				<h2 className="m-0 text-center ">Login Form</h2>
				{/* USERNAME */}
				<div className="form-control">
					<label className="label">
						<span className="label-text">UserName</span>
						<span className="label-text"></span>
					</label>
					<input
						type="email"
						className="input input-bordered"
						value={user.username}
						onChange={(e) => {
							setUser(
								produce(user, (draft) => {
									draft.username = e.target.value;
								})
							);
						}}
					/>
				</div>

				{/* PASSWORD */}
				<div className="form-control ">
					<label className="label">
						<span className="label-text">Password</span>
						<span className="label-text"></span>
					</label>
					<input
						type="password"
						className="input input-bordered"
						value={user.password}
						onChange={(e) => {
							setUser(
								produce(user, (draft) => {
									draft.password = e.target.value;
								})
							);
						}}
					/>
				</div>

				{/* <div className="form-control ">
					<label className="label">
						<span className="label-text">User Type</span>
						<span className="label-text"></span>
					</label>
					<select
						className="input input-bordered"
						value={userType}
						onChange={(e) => {
							setUserType(e.target.value as "admin" | "employee");
						}}
					>
						<option value="admin">admin</option>
						<option value="employee">employee</option>
					</select>
				</div> */}

				{/* Button */}
				<div className="form-control">
					<button
						className="btn btn-outline mt-4"
						onClick={formSubmitHandler}
					>
						Login User
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
