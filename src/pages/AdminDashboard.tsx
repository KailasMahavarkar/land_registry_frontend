import { useState } from "react";
import RootAccessControl from "../components/admin/AdminAccessControl";
import RootAnalytics from "../components/admin/AdminAnalytics";
import RootUserManagement from "../components/admin/AdminUserManagement";

const RootDashboard = () => {
	const [active, setActive] = useState("AccessControl");

	const sidebarNav = [
		{
			name: "AccessControl",
			component: <RootAccessControl />,
		},
		{
			name: "Analytics",
			component: <RootAnalytics />,
		},
        {
            name: "ManageUsers",
            component: <RootUserManagement />
        }
	];

	return (
		<div className="flex w-full shadow child:m-2">
			<div className="flex flex-col items-center justify-start  w-[200px] shadow">
				<div className="btn-group btn-group-vertical m-5 ">
					{sidebarNav.map((item, index) => {
						return (
							<button
								key={index}
								onClick={() => setActive(item.name)}
								className={`btn bg-base-200 text-base-content hover:text-white  ${
									active === item.name ? "btn-active" : ""
								}`}
							>
								{item.name}
							</button>
						);
					})}
				</div>
			</div>
			<div className="flex-1 ">
				{/* conditionally render page */}
				{sidebarNav.map((item, index) => {
					if (item.name === active) {
						return item.component;
					}
				})}
			</div>
		</div>
	);
};

export default RootDashboard;
