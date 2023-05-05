import { faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomContext from "../context/custom.context";
import { useSelector, useDispatch } from "react-redux";
import { profileType } from "../types/type";
import { removeLogin } from "../redux/actions/stateCreator";
import { useEffectAsync } from "../helper";

const Header = () => {
	const { setTheme, theme } = useContext(CustomContext);
	const { username } = useSelector((state: profileType) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="navbar bg-base-100 shadow-md rounded-md">
			<div className="navbar-start ">
				<div className="dropdown dropdown-start">
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="flex ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
						</div>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link to="/search">Search</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</ul>
				</div>

				<Link to="/">
					<div className="btn btn-ghost normal-case text-xl no-underline ">
						Land Registry System
					</div>
				</Link>
			</div>

			{/* {media.onGreaterThanMobile() && <NavBarItems />} */}

			<div className="navbar-end child:mx-1">
				{username ? (
					<Link to="login">
						<button className="btn btn-outline btn-sm">
							Welcome to Land Registry System
						</button>
					</Link>
				) : (
					<Link to="login">
						<button className="btn btn-outline btn-sm">
							Admin & Employee Login
						</button>
					</Link>
				)}

				{username && (
					<button
						className="btn btn-outline btn-error btn-sm"
						onClick={() => {
							dispatch(removeLogin());
							navigate("/login");
						}}
					>
						Logout
						<FontAwesomeIcon icon={faUser} />
					</button>
				)}

				<button
					className="btn btn-circle btn-ghost"
					onClick={() =>
						setTheme(theme === "light" ? "dark" : "light")
					}
				>
					<FontAwesomeIcon
						size="2x"
						icon={theme === "light" ? faMoon : faSun}
					/>
				</button>
			</div>
		</div>
	);
};

export default Header;
