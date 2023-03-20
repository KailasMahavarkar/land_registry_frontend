import { useContext } from "react";
import CustomContext from "../context/custom.context";

const useDrizzle = () => {
    const { drizzle } = useContext(CustomContext);
    const drizzleMethods = drizzle.contracts.LandRegistry.methods;

    const validateLandToken = async (landToken: number) => {
        try {
            const landTokenCount = await drizzleMethods.getRegisteredLandCount().call();
            if (landToken > landTokenCount || landToken === 0) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log("cannot get property -->", error);
            return false;
        }
    };

    const getProperty = async (landToken: number) => {
        try {
            const landTokenData = await drizzleMethods.getProperty(landToken).call();
            return landTokenData;
        } catch (error) {
            console.log("cannot get property -->", error);
            return {}
        }
    }

    const getLandCount = async () => {
        try {
            const landTokenCount = await drizzleMethods.getRegisteredLandCount().call();
            return landTokenCount;
        } catch (error) {
            console.log("cannot get property -->", error);
            return -1;
        }
    }

    return {
        validateLandToken,
        getLandCount,
        getProperty
    }
}

export default useDrizzle