import { useState } from "react";
import EmployeeMergeLandCase from "../components/employee/EmployeeMergeLandCase";
import EmployeeNewLandRegistration from "../components/employee/EmployeeNewLandRegistration";
import EmployeePropertyHistory from "../components/employee/EmployeePropertyHistory";
import EmployeeSplitLandCase from "../components/employee/EmployeeSplitLandCase";
import EmployeeTransferLand from "../components/employee/EmployeeTransferLand";
import EmployeePropertyDetails from "../components/employee/EmployeePropertyDetails";



const EmployeeDashboard = () => {
    const [active, setActive] = useState("New Registration");


    const sidebarNav = [
        {
            name: "Property Details",
            component: <EmployeePropertyDetails />
        },
        {
            name: "New Registration",
            component: <EmployeeNewLandRegistration />,
        },
        {
            name: "Transfer Land",
            component: <EmployeeTransferLand />,
        },
        {
            name: "Split Land Case",
            component: <EmployeeSplitLandCase />,
        },
        {
            name: "Merge Land Case",
            component: <EmployeeMergeLandCase />,
        },
        // {
        //     name: "Update Document",
        //     component: <EmployeeDocumentAuthentication />,
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
                                className={`btn bg-base-200 text-base-content hover:text-white  ${active === item.name ? "btn-active" : ""
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

export default EmployeeDashboard;
