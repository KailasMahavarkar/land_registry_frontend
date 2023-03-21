import { useState } from "react";
import AdminUserManagement from "../components/admin/AdminUserManagement";
import AdminMergeProperties from "../components/admin/AdminMergeProperties";
import AdminRegisterProperties from "../components/admin/AdminRegisterProperties";
import AdminSplitProperties from "../components/admin/AdminSplitProperties";
import AdminTransferProperties from "../components/admin/AdminTransferProperties";

const RootDashboard = () => {
    const [active, setActive] = useState("AccessControl");


    const sidebarNav = [
        {
            name: "Register Approval",
            component: <AdminRegisterProperties />,
        },
        {
            name: "Merge Approval",
            component: <AdminMergeProperties />,
        },
        {
            name: "Split Approval",
            component: <AdminSplitProperties />,
        },
        {
            name: "Transfer Approval",
            component: <AdminTransferProperties />,
        },

        {
            name: "ManageUsers",
            component: <AdminUserManagement />,
        },
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

                                className={`btn bg-base-200 text-base-content hover:text-white  ${active === item.name ? "btn-active" : ""}`}
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
