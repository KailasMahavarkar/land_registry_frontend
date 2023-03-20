import axios from "axios";
import { useEffectAsync } from "../../helper";
import { useContext, useState } from "react";
import customToast from "../../toast";
import treeify from "treeify";
import CustomContext from "../../context/custom.context";

interface PropertyCardProps {
    propertyId: number;
    newOwnerName: string;
    newOwnerAadhaarCardNumber: string;
    newOwnerPanCardNumber: string;
    newOwnerAddressProofA: string;
    newOwnerAddressProofB: string;
    documents: {
        [key: string]: {
            name: string;
            link: string;
            hashstring: string;
            verified: boolean;
        };
    }[];
}

const AdminTransferProperties = () => {
    const { drizzle } = useContext(CustomContext);
    const [properties, setProperties] = useState<PropertyCardProps[]>([]);

    const [expanded, setExpanded] = useState({
        index: -1,
        expanded: false,
    });

    const toggleExpansion = (index: number, expanded: boolean) => {
        // set current expanded to true
        setExpanded({
            index: index,
            expanded: expanded,
        });
    };

    const transferHandler = async (
        propertyId: number,
        status: "approved" | "reject"
    ) => {
        const targetProperty = properties.find((property) => {
            return property.propertyId === propertyId;
        });

        if (!targetProperty) {
            return customToast({
                message: "Property not found",
                icon: "error",
            });
        }

        const propertyFromBlock = await drizzle.contracts.LandRegistry.methods
            .getRegisteredLandCount()
            .call();


        try {
            await drizzle.contracts.LandRegistry.methods
                .transferOwnership(
                    [targetProperty.propertyId],
                    targetProperty.newOwnerName,
                    targetProperty.newOwnerAadhaarCardNumber,
                    targetProperty.newOwnerPanCardNumber,
                    []
                )
                .send();

            console.log("success ")
        } catch (error) {
            console.log("transaction failed")
        }

        axios
            .patch("/property/transfer", {
                propertyId: propertyId,
                status: status,
            })
            .then(() => {
                const newProperties = properties.filter((property, index) => {
                    return propertyId !== property.propertyId;
                });
                setProperties(newProperties);
            });
    };

    const getProperties = async () => {
        try {
            const response = await axios.get(
                "/property/transfer?status=pending"
            );
            setProperties(response.data?.data);
        } catch (error: any) {
            return customToast({
                message: error.response.data.message,
                icon: "error",
            });
        }
    };

    useEffectAsync(async () => {
        await getProperties();
    }, []);

    return (
        <div>
            <div className="max-w-screen overflow-x-auto">
                <div className="max-w-screen overflow-x-auto">
                    {properties.length === 0 ? (
                        <div className="text-center">No Properties to show</div>
                    ) : (
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th colSpan={5}></th>
                                    <th>Property ID</th>
                                    <th>Owner Name</th>
                                    <th>State</th>
                                    <th>Created On</th>
                                    <th>Details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {/* rows */}
                                {properties.map((property, index) => (
                                    <>
                                        <tr key={index}>
                                            <th colSpan={5}>{index + 1}</th>
                                            <td>{property.propertyId}</td>
                                            <td>{property.newOwnerName}</td>
                                            <td>
                                                {
                                                    property.newOwnerAadhaarCardNumber
                                                }
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => {
                                                        toggleExpansion(
                                                            index,
                                                            !expanded.expanded
                                                        );
                                                    }}
                                                >
                                                    Show Details
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-success"
                                                    onClick={() =>
                                                        transferHandler(
                                                            property.propertyId,
                                                            "approved"
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                                {/* <button
													className="btn btn-sm btn-error mx-2"
													onClick={() =>
														transferHandler(
															property.propertyId,
															"reject"
														)
													}
												>
													Reject
												</button> */}
                                            </td>
                                        </tr>

                                        {expanded.expanded &&
                                            expanded.index === index && (
                                                <pre>
                                                    {treeify.asTree(
                                                        properties[
                                                        expanded.index
                                                        ] as any,
                                                        true,
                                                        true
                                                    )}
                                                </pre>
                                            )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <button className="btn btn-primary" onClick={getProperties}>
                    refresh
                </button>
            </div>
        </div>
    );
};

export default AdminTransferProperties;
