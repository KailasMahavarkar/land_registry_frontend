import { useState } from "react";
import axios from "axios";
import customToast from "../toast";

// style --> formstyle

// profile form
const LoginForm = () => {
	const initalState = {
		username: "",
		password: "",
	};

	// profile form state
	const [profile, setProfile] = useState(initalState);


	// get profile data from redux
	// useEffectAsync(() => {
	// 	setProfile({
	// 		fullname: user.fullname || "",
	// 		email: user.email || "",
	// 		phone: user.phone || 0,
	// 		country: user.country || "India",
	// 	});
	// }, []);

	// const handleChange = (key: string, value: any) => {
	// 	setProfile({
	// 		...profile,
	// 		[key]: value,
	// 	});
	// };

	const formSubmitHandler = async () => {
		try {
			const result = await axios.patch("/user/login", profile);

			return customToast({
				icon: "info",
				message: "Profile updated",
			});
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
				{/* Full Name */}
				<div className="form-control">
					<label className="label">
						<span className="label-text">UserName</span>
						<span className="label-text"></span>
					</label>
					<input
						type="email"
						className="input input-bordered"
						value={profile.username}
						onChange={(e) => {
							setProfile({
								...profile,
								username: e.target.value,
							});
						}}
					/>
				</div>

				{/* Email */}
				<div className="form-control ">
					<label className="label">
						<span className="label-text">Password</span>
						<span className="label-text"></span>
					</label>
					<input
						type="password"
						className="input input-bordered"
						value={profile.password}
						onChange={(e) => {
							setProfile({
								...profile,
								password: e.target.value,
							});
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
						value={profile.password}
						onChange={(e) => {}}
					>
						<option value="1">admin</option>
						<option value="2">root</option>
					</select>
				</div>

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
