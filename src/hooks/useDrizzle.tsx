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


    async function getTree(landToken: number) {
        const landTokenData = await getProperty(landToken);
        const transferHistory = landTokenData.transferHistory;

        // Base case: the land token has not been transferred yet
        if (transferHistory.length === 0) {
            return {
                name: "Land Token",
                children: []
            }
        }

        // Recursive case: the land token has been transferred at least once
        const root = {
            name: `Land Token (${landToken})`,
            children: []
        }

        for (let i = 0; i < transferedFrom.length; i++) {
            const transfer = transferedFrom[i];
            const transferNode = {
                name: `${transfer.transferedFrom} → ${transfer.transferedTo}`,
                children: []
            }

            // Recursively add the transfer history of the transferred land token as a child node
            const childTree: any = await getTree(transfer.transferedTo);
            transferNode.children.push(childTree);

            root.children.push(transferNode);
        }

        return root;
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
        getProperty,
        getTree
    }
}

export default useDrizzle