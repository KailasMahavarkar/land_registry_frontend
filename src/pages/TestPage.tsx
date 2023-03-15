import { useContext } from "react";
import CustomContext from "../context/custom.context";

const TestPage = () => {
	const { drizzle, drizzleState, initialized } = useContext(CustomContext);

	console.log(
		"ran testPage",
		drizzleState.contracts["LandRegistry"].getRegisteredLandCount
	);
	return <div>Test route working </div>;
};

export default TestPage;
