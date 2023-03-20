import { faAdd, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import produce from "immer";
import CustomContext from "../../context/custom.context";
import {
    employeePermissionType,
    singleUserType,
} from "../../types/type";
import axios from "axios";
import customToast from "../../toast";
import { sha512 } from "js-sha512";
import { useEffectAsync } from "../../helper";


const AdminUserManagement = () => {
    const [manageView, setManageView] = useState<boolean>(false);
    const { users, setUsers } = useContext(CustomContext);

    useEffectAsync(async () => {

        try {
            // get all users
            const result = await axios.get('/employee/readAll');
            setUsers(result.data.data)
        } catch (error) {
            console.log(error)
        }

    }, [])

    const userDeleteHandler = (id: string) => {
        axios.delete(`/employee/delete?id=${id}`).then((data) => {
            customToast({
                message: "User deleted successfully",
                icon: "success",
            })

            const updatedUsers = users.filter((u) => u._id !== id);
            setUsers(updatedUsers);
            Swal.fire(
                "Deleted!",
                "",
                "success"
            );
        }).catch((error) => {
            console.log(error);
            customToast({
                message: "Something went wrong while deleting user",
                icon: "error",
            })
            return;
        })

    }

    const UserTableView = () => {
        return (
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user._id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.username}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            Swal.fire({
                                                title: `Are you sure
                                            you want to delete this user?`,
                                                showCancelButton: true,
                                                confirmButtonText: `Delete`,
                                                confirmButtonColor: "blue",
                                            }).then(async (result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {
                                                    await userDeleteHandler(user._id);
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

        const userDefault: singleUserType = {
            _id: "",
            role: "employee",
            fullname: "",
            username: "",
            password: "",
            email: "",
            permissions: {
                transfer: false,
                split: false,
                merge: false,
            },
        }

        const [newUser, setNewUser] = useState<singleUserType>(userDefault);

        const formSubmitHandler = async () => {
            try {
                const hash = sha512(newUser.password).toString();

                const result = await axios.post('/employee/create', {
                    ...newUser,
                    password: hash,
                })
                if (result.status === 200) {
                    customToast({
                        message: "User created successfully",
                        icon: "success",
                    })

                    // clear form
                    setNewUser(userDefault)
                    setManageView(false)
                }
            } catch (error) {
                console.log(error)
                customToast({
                    message: "Something went wrong",
                    icon: "error",
                })
            }
        }


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
                                value={newUser.fullname}
                                onChange={(e: any) => {
                                    setNewUser({
                                        ...newUser,
                                        fullname: e.target.value,
                                    });
                                }}
                            />
                        </div>

                        {/* Username */}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Username</span>
                                <span className="label-text"></span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={newUser.username}
                                onChange={(e) => {
                                    setNewUser(
                                        produce(newUser, (draft) => {
                                            draft.username = e.target.value;
                                        })
                                    );
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Password</span>
                                <span className="label-text"></span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={newUser.password}
                                onChange={(e) => {
                                    setNewUser(
                                        produce(newUser, (draft) => {
                                            draft.password = e.target.value;
                                        })
                                    );
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


                        {/* Access */}
                        <div className="form-control">
                            {[
                                "transfer" as employeePermissionType,
                                "split" as employeePermissionType,
                                "merge" as employeePermissionType,
                            ].map((permission: employeePermissionType) => {
                                return (
                                    <label className="label cursor-pointer">
                                        <span className="label-text uppercase">
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
                                                            draft.permissions[permission] = e.target.checked;
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
                                onClick={formSubmitHandler}
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
            {manageView ? (
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setManageView(false);
                    }}
                >
                    Go Back to Users
                    <FontAwesomeIcon icon={faUsers} className="mx-2" />
                </button>
            ) : (
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        setManageView(true)
                    }
                >
                    Add New User
                    <FontAwesomeIcon icon={faAdd} className="mx-2" />
                </button>
            )}

            {manageView ? <NewUserForm /> : <UserTableView />}
        </div>
    );
};

export default AdminUserManagement;
