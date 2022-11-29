import ReactDOM from "react-dom/client";

import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";

import SearchLandTokenPage from "./pages/user/SearchTokenResultPage";
import "./styles/main.scss";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./components/Header";
import CustomContext from "./context/custom.context";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import defaultUsers from "./data/users.data";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import axios from "axios";

import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";

import { profileType, singleUserType } from "./types/type";
import configureStore from "./redux/configureStore";
import { useEffectAsync } from "./helper";

const { store, persistor } = configureStore();

const rootnode = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

axios.defaults.baseURL = "http://localhost:2000";

// add state to root component
const App = () => {
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
	const [users, setUsers] = useState<singleUserType[]>(defaultUsers);

    useEffectAsync(()=>{

        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme") as "light" | "dark");
        }

    }, [])

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<CustomContext.Provider
						value={{
							theme,
							setTheme,
							users: users,
							setUsers: setUsers,
							profile: profile,
							setProfile: setProfile,
						}}
					>
						<div
							data-theme={theme}
							className="body flex flex-col items-center min-h-full w-full prose max-w-none"
						>
							<div className="flex w-full max-w-[90%]">
								<Header />
							</div>
							<div className="flex w-full max-w-[90%] min-h-[90vh] min-w-[80%]">
								<Routes>
									<Route index element={<Home />} />
									<Route
										path="search/:token"
										element={<SearchLandTokenPage />}
									/>

									<Route path="login" element={<Login />} />

									<Route
										path="dashboard"
										element={<EmployeeDashboard />}
									/>

									<Route
										path="admin-dashboard"
										element={<AdminDashboard />}
									/>

									<Route path="*" element={<Error />} />
								</Routes>
							</div>
						</div>
					</CustomContext.Provider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
};

rootnode.render(<App />);
