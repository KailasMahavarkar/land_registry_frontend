import axios from "axios";
import { useEffectAsync } from "../../helper";
import { useContext, useState } from "react";
import customToast from "../../toast";
import treeify from "treeify";
import CustomContext from "../../context/custom.context";

interface PropertyCardProps {
    propertyId: number;
    propertyHouseNumber: string;
    propertyStreetName: string;
    propertyType: string;
    propertyLength: number;
    propertyWidth: number;
    propertyPincode: number;
    propertyState: string;
    propertyVillage: string;
    propertyDistrict: string;
    propertyTaluka: string;
    ownerName: string;
    aadharCardNumber: string;
    panCardNumber: string;
    transfered: boolean;
    transferedTo: number;
    transferedFrom: number[];
    propertySplitLandId: number[];
    surveyNumber: number;
    subSurveyNumber: number;
    createdOn: string;
    documentNames: string[];
    documents: Record<string, any>;
}

const AdminRegisterProperties = () => {
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

    const getProperties = async () => {
        try {
            const response = await axios.get("/property/register?status=pending");
            setProperties(response.data?.data);
        } catch (error: any) {
            return customToast({
                message: error.response.data.message,
                icon: "error",
            });
        }
    };

    const newRegisterHandler = async (
        propertyId: number,
        status: "approved" | "reject"
    ) => {
        const targetProperty = properties.find((property) => {
            return property.propertyId === propertyId;
        });

        if (!targetProperty) {
            return;
        }

        const property = {
            propertyHouseName: targetProperty.propertyHouseNumber,
            propertyStreetName: targetProperty.propertyStreetName,
            propertyType: targetProperty.propertyType,
            propertyLength: targetProperty.propertyLength,
            propertyWidth: targetProperty.propertyWidth,
            propertyPincode: targetProperty.propertyPincode,
            propertyState: targetProperty.propertyState,
            propertyVillage: targetProperty.propertyVillage,
            propertyDistrict: targetProperty.propertyDistrict,
            propertyTaluka: targetProperty.propertyTaluka,

            ownerName: targetProperty.ownerName,
            aadharCardNumber: targetProperty.aadharCardNumber,
            panCardNumber: targetProperty.panCardNumber,

            transfered: targetProperty.transfered,
            transferedTo: targetProperty.transferedTo,
            transferedFrom: targetProperty.transferedFrom,
            propertySplitLandId: targetProperty.propertySplitLandId,

            surveyNumber: targetProperty.surveyNumber,
            subSurveyNumber: targetProperty.subSurveyNumber,
            createdOn: targetProperty.createdOn,

            documents: targetProperty.documents.map((document: any) => {
                return {
                    docId: document.docId,
                    hash: document.hash,
                    name: document.name,
                    link: document.link,
                    verified: document.verified,
                };
            })
        }
        console.log("property", property)

        try {
            const metamaskResult = await drizzle.contracts.LandRegistry.methods
                .registerNewProperty(Object.values(property)).send();

            if (!metamaskResult) {
                return customToast({
                    message: "Transaction failed",
                    icon: "error",
                });
            }

            axios.patch("/property/register", {
                propertyId: propertyId,
                status: status,
            }).then((response) => {
                const newProperties = properties.filter((property, index) => {
                    return property.propertyId !== targetProperty.propertyId;
                });
                setProperties(newProperties);
            })

        } catch (error: any) {
            console.log("error", error)
            return customToast({
                message: error?.response?.data?.message,
                icon: "error",
            });
        }


    };

    useEffectAsync(async () => {
        try {
            const response = await axios.get("/property/register?status=pending");
            setProperties(response.data?.data);
        } catch (error: any) {
            return customToast({
                message: error.response.data.message,
                icon: "error",
            });
        }
    }, []);

    return (
        <div className="max-w-[90%]">
            <div className=" overflow-x-auto">
                {properties.length === 0 ? (
                    <div className="text-center">No Properties to show</div>
                ) : (
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th >Property ID</th>
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
                                        <td >{property.propertyId}</td>
                                        <td>{property.ownerName}</td>
                                        <td>{property.propertyState}</td>
                                        <td>{property.createdOn}</td>
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
                                                    newRegisterHandler(
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
														newRegisterHandler(
															property.propertyId,
															"reject"
														)
													}
												>
													Reject
												</button> */}
                                        </td>
                                    </tr>
                                    {
                                        expanded.expanded && (
                                            <pre className="max-w-[300px]">
                                                {treeify.asTree(
                                                    properties[expanded.index] as any,
                                                    true,
                                                    true
                                                )}
                                            </pre>
                                        )
                                    }
                                </>
                            ))}

                        </tbody>
                    </table>
                )}
            </div>
            <button className="btn btn-primary" onClick={getProperties}>
                refresh
            </button>
        </div >
    );
};

export default AdminRegisterProperties;
