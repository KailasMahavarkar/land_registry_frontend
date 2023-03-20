import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/main.scss";
import "react-datepicker/dist/react-datepicker.css";
import CustomContext from "./context/custom.context";
import { useState } from "react";
import configureStore from "./redux/configureStore";

import landRegistery from "./solidity_contracts/LandRegistry.json";

// @ts-ignore
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

// @ts-ignore
import { newContextComponents } from "@drizzle/react-components";
import { Provider } from "react-redux";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import { useEffectAsync } from "./helper";
import { profileType, singleUserType } from "./types/type";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchBarToken from "./components/user/SearchBarToken";
import Error from "./pages/Error";
import TestPage from "./pages/TestPage";
const { AccountData, ContractData } = newContextComponents;
import { drizzleOptions, drizzleStore } from "./middleware/drizzleMw";

const { store, persistor } = configureStore();
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

const rootnode = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

axios.defaults.baseURL = "http://localhost:2000";

function App() {

    const [theme, setTheme] = useState<"light" | "dark">("light");

    const defaultProfile = {
        _id: "",
        username: "",
        role: "employee",
        fullname: "",
        email: "",
        apikey: "",
        datejoined: "",
        status: "active",
    };

    const [profile, setProfile] = useState<profileType>(
        defaultProfile as profileType
    );
    const [users, setUsers] = useState<singleUserType[]>([]);

    useEffectAsync(() => {
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme") as "light" | "dark");
        }
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <DrizzleContext.Provider drizzle={drizzle}>
                    <BrowserRouter>
                        <DrizzleContext.Consumer>
                            {(drizzleContext: any) => {
                                const { drizzle, drizzleState, initialized } =
                                    drizzleContext;
                                if (!initialized) {
                                    return "Loading...";
                                }
                                console.log("drizzle ", drizzle);
                                console.log("drizzle state ", drizzleState);
                                return (
                                    <>
                                        <CustomContext.Provider
                                            value={{
                                                theme,
                                                setTheme,
                                                users: users,
                                                setUsers: setUsers,
                                                profile: profile,
                                                setProfile: setProfile,

                                                drizzle,
                                                drizzleState,
                                                initialized,
                                            }}
                                        >
                                            <Routes>
                                                <Route index element={<Home />} />
                                                <Route
                                                    path="search/:token"
                                                    element={<SearchBarToken />}
                                                />

                                                <Route
                                                    path="login"
                                                    element={<Login />}
                                                />

                                                <Route
                                                    path="dashboard"
                                                    element={<EmployeeDashboard />}
                                                />

                                                <Route
                                                    path="admin-dashboard"
                                                    element={<AdminDashboard />}
                                                />

                                                <Route
                                                    path="test"
                                                    element={<TestPage />}
                                                />

                                                <Route path="*" element={<Error />} />
                                            </Routes>
                                        </CustomContext.Provider>
                                    </>
                                );
                            }}
                        </DrizzleContext.Consumer>
                    </BrowserRouter>
                </DrizzleContext.Provider>
            </PersistGate>
        </Provider>
    );
}

rootnode.render(<App />);
