import { useState } from "react";
import axios from "axios";
import customToast from "../toast";
import { sha512 } from "js-sha512";
import produce from "immer";
import { useNavigate } from "react-router-dom";
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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSubmitHandler = async () => {
        const data = {
            username: user.username,
            password: sha512(user.password).toString(),
        }

        try {
            const result = await axios.post("/auth/login", data);

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
        <div className="w-full h-full grid place-items-center">
            <div className="flex justify-center items-center shadow-md">
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

                    {/* Button */}
                    <div className="form-control">
                        <button
                            className="btn btn-outline mt-4"
                            onClick={formSubmitHandler}
                        >
                            Login User
                        </button>
                    </div>

                    <div className="form-control mt-5 text-center ">
                        employee test login:
                        <p>
                            username: kai
                        </p>

                        <p>
                            password: 123
                        </p>
                    </div>
                    <hr className="my-2" />
                    <div className="form-control text-center">
                        admin test login:
                        <p>
                            username: root
                        </p>

                        <p>
                            password: 123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
