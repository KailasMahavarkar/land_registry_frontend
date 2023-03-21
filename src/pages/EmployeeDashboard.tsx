import { useEffect, useState } from "react";
import EmployeeMergeLandCase from "../components/employee/EmployeeMergeLandCase";
import EmployeeNewLandRegistration from "../components/employee/EmployeeNewLandRegistration";
import EmployeeSplitLandCase from "../components/employee/EmployeeSplitLandCase";
import EmployeeTransferLand from "../components/employee/EmployeeTransferLand";
import EmployeePropertyDetails from "../components/employee/EmployeePropertyDetails";
import { useSelector } from "react-redux";


const EmployeeDashboard = () => {
    const [active, setActive] = useState("New Registration");
    const reduxData = useSelector(state => state);
    const permissions = (reduxData as any).permissions;

    const permissionLessNav = [
        {
            name: "Property Details",
            check: false,
            keyname: "details",
            component: <EmployeePropertyDetails />
        },
    ]

    const permissionFullNav = [

        {
            name: "New Registration",
            check: true,
            keyname: "register",
            component: <EmployeeNewLandRegistration />,
        },
        {
            name: "Transfer Land",
            check: true,
            keyname: "transfer",
            component: <EmployeeTransferLand />,
        },
        {
            name: "Split Land Case",
            check: true,
            keyname: "split",
            component: <EmployeeSplitLandCase />,
        },
        {
            name: "Merge Land Case",
            check: true,
            keyname: "merge",
            component: <EmployeeMergeLandCase />,
        },

    ];

    useEffect(() => {
        console.log("permissions-->", permissions);
    }, [])

    return (
        <div className="flex w-full shadow child:m-2">
            <div className="flex flex-col items-center justify-start shadow min-w-[10%]">
                <div className="btn-group btn-group-vertical m-5">
                    {permissionLessNav.map((item, index) => {
                        return (
                            <button
                                key={item.keyname}
                                onClick={() => setActive(item.name)}
                                className={`btn bg-base-200 text-base-content hover:text-white  ${active === item.name ? "btn-active" : ""
                                    }`}
                            >
                                {item.name}
                            </button>
                        );
                    })}

                    {permissionFullNav.map((item, index) => {
                        return (
                            <>

                                {permissions[item.keyname] && (
                                    <button
                                        key={item.keyname}
                                        onClick={() => setActive(item.name)}
                                        className={`btn bg-base-200 text-base-content hover:text-white  ${active === item.name ? "btn-active" : ""
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
            <div className="flex-1 ">
                {/* conditionally render page */}
                {[...permissionLessNav, ...permissionFullNav].map((item, index) => {
                    if (item.name === active) {
                        return item.component;
                    }
                })}
            </div>
        </div>
    );
};

export default EmployeeDashboard;
