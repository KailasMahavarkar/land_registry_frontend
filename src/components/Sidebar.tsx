import {
	faArrowDown,
	faGauge,
	faLandmark,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, Link } from "react-router-dom";

const navArray = [
	{
		name: "Dashboard",
		link: "/",
		icon: <FontAwesomeIcon icon={faGauge} size="1x" width="20px" />,
		disabled: false,
	},
	{
		name: "About",
		link: "/about",
		icon: <FontAwesomeIcon icon={faLandmark} size="1x" width="20px" />,
		disabled: false,
	},
	{
		name: "Buyer Profile",
		link: "/buyer-profile",
		icon: <FontAwesomeIcon icon={faImages} size="1x" width="20px" />,
		disabled: true,
	},
	{
		name: "Add Land",
		link: "/add-land",
		icon: <FontAwesomeIcon icon={faLandmark} size="1x" width="20px" />,
		disabled: true,
	},
	{
		name: "Land Requests",
		link: "/land-requests",
		icon: <FontAwesomeIcon icon={faArrowDown} size="1x" width="20px" />,
		disabled: true,
	},
	{
		name: "Land Gallery",
		link: "/land-gallery",
		icon: <FontAwesomeIcon icon={faImages} size="1x" width="20px" />,
		disabled: true,
	},
];

const SideBar = () => {
	return (
		<ul className=" bg-transparent menu p-2 ">
			{navArray.map(
				(item: any, key: number) =>
					!item.disabled && (
						<li className=" rounded-md " key={key}>
							<Link to={item.link}>
								{item.icon}
								{item.name}
							</Link>
						</li>
					)
			)}
			<div className="divider"></div>
			<li className="rounded-md ">
				<Link to="/logout">
					<FontAwesomeIcon icon={faUser} size="1x" width="20px" />
					Logout
				</Link>
			</li>
		</ul>
	);
};

export default SideBar;
