import ReactDOM from "react-dom/client";

import { createBrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";

import SearchLandTokenPage from "./pages/user/SearchTokenResultPage";
import "./styles/main.scss";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./components/Header";
import CustomContext, { singleUserType } from "./context/custom.contex";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import defaultUsers from "./data/users.data";
import EmployeeDashboard from "./pages/EmployeeDashboard";

const rootnode = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

// add state to root component
const App = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [users, setUsers] = useState<singleUserType[]>(defaultUsers);

	return (
		<BrowserRouter>
			<CustomContext.Provider
				value={{
					theme,
					setTheme,
					users: users,
					setUsers: setUsers,
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
	);
};

rootnode.render(<App />);
