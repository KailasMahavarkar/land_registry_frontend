import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { removeLogin } from "../redux/actions/stateCreator";

const Navbar = () => {

    // get current user from redux
    const user = useSelector((state: any) => state);
    const dispatch = useDispatch();

    return (
        <div className="shadow-lg ">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">
                        Land Registry System
                    </a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to='/' >
                                Home
                            </Link>
                        </li>
                        {
                            user.role === 'employee' && (
                                <li>
                                    <>
                                        <Link to='/dashboard'
                                        >
                                            Employee Dashboard
                                        </Link>
                                    </>

                                </li>
                            )
                        }


                        {/* when user is logged as admin */}
                        {
                            user.role === 'admin' && (
                                <li>
                                    <>
                                        <Link to='/admin-dashboard'
                                        >
                                            Admin Dashboard
                                        </Link>
                                    </>

                                </li>
                            )
                        }

                        {/* when user not logged (default) view */}
                        {
                            user.role === "unknown" && (
                                <li>
                                    <>
                                        <Link to='/login'
                                        >
                                            Login
                                        </Link>
                                    </>

                                </li>
                            )
                        }

                        {/* when user is logged in */}
                        {
                            user.role !== "unknown" && (
                                <li>
                                    <Link to='/login' className="btn btn-primary mx-3"
                                        onClick={() => {
                                            dispatch(removeLogin());
                                        }}>
                                        Logout
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar