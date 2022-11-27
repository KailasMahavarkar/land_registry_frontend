import { useState } from "react";
import AdminMergeLandCase from "../components/employee/EmployeeMergeLandCase";
import AdminNewLandRegistration from "../components/employee/EmployeeNewLandRegistration";
import AdminPropertyHistory from "../components/employee/EmployeePropertyHistory";
import AdminSplitLandCase from "../components/employee/EmployeeSplitLandCase";
import AdminTransferLand from "../components/employee/EmployeeTransferLand";

const AdminDashboard = () => {
	const [active, setActive] = useState("New Registration");
    

	const sidebarNav = [
		{
			name: "New Registration",
			component: <AdminNewLandRegistration />,
		},
        {
            name: "Property History",
            component: <AdminPropertyHistory />,
        },
        {
            name: "Transfer Land",
            component: <AdminTransferLand />,
        },
        // {
        //     name: "Authenticate Documents",
        //     component: <AdminDocumentAuthentication />,
        // },
        {
            name: "Split Land Case",
            component: <AdminSplitLandCase />,
        },
        {
            name: "Merge Land Case",
            component: <AdminMergeLandCase />,
        },
        // {
        //     name: "Update Document",
        //     component: <AdminDocumentAuthentication />,
        // }
	];

	return (
		<div className="flex w-full shadow child:m-2">
			<div className="flex flex-col items-center justify-start shadow min-w-[10%]">
				<div className="btn-group btn-group-vertical m-5">
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

export default AdminDashboard;
