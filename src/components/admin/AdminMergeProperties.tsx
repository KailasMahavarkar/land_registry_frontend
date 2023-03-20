import axios from "axios";
import { useEffectAsync } from "../../helper";
import { useContext, useState } from "react";
import customToast from "../../toast";
import treeify from "treeify";
import CustomContext from "../../context/custom.context";

interface PropertyCardProps {
    propertyId: number;
    childIds: number[];
}

const AdminMergeProperties = () => {
    const { drizzle } = useContext(CustomContext);

    const drizzleMethods = drizzle.contracts.LandRegistry.methods;
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

    const mergeHandler = async (
        propertyId: number,
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

        // get the parent property
        const parentProperty = await drizzleMethods
            .getProperty(targetProperty?.propertyId)
            .call();


        const schema = {
            propertyHouseNumber: parentProperty.propertyHouseNumber,
            propertyStreetName: parentProperty.propertyStreetName,
            propertyType: parentProperty.propertyType,
            propertyLength: parentProperty.propertyLength,
            propertyWidth: parentProperty.propertyWidth,
            propertyPincode: parentProperty.propertyPincode,
            propertyState: parentProperty.propertyState,
            propertyVillage: parentProperty.propertyVillage,
            propertyDistrict: parentProperty.propertyDistrict,
            propertyTaluka: parentProperty.propertyTaluka,

            ownerName: parentProperty.ownerName,
            aadharCardNumber: parentProperty.aadharCardNumber,
            panCardNumber: parentProperty.panCardNumber,

            transfered: true,
            transferedTo: targetProperty?.propertyId,
            transferedFrom: targetProperty?.childIds,
            propertySplitLandId: [],

            surveyNumber: parentProperty.surveyNumber,
            subSurveyNumber: parentProperty.subSurveyNumber,
            createdOn: parentProperty.createdOn,

            documents: [],
        };

        try {
            const result = await drizzle.contracts.LandRegistry.methods
                .mergeProperties(Object.values(schema))
                .send();

            if (!result) {
                return customToast({
                    message: "Transaction failed",
                    icon: "error",
                });
            }

            axios.patch("/property/merge", {
                propertyId: propertyId,
                status: "approved",
            }).then((response) => {
                const newProperties = properties.filter((property, index) => {
                    return property.propertyId !== propertyId;
                });
                setProperties(newProperties);
            })




        } catch (error: any) {
            console.log("error", error)
            return customToast({
                message: error?.response?.data?.msg || "Merge Failed",
                icon: "error",
            });
        }

        try {

            customToast({
                message: "Merge Successful",
                icon: "success",
            });
        } catch (error: any) {
            customToast({
                message: "Something went wrong while merging properties",
                icon: "error",
            })
        }
    };

    const getProperties = async () => {
        try {
            const response = await axios.get("/property/merge?status=pending");
            setProperties(response.data?.data);
        } catch (error: any) {
            return customToast({
                message: error.response.data.message,
                icon: "error",
            });
        }
    };

    useEffectAsync(async () => {
        try {
            const response = await axios.get("/property/merge?status=pending");
            setProperties(response.data?.data);
        } catch (error: any) {
            return customToast({
                message: error.response.data.message,
                icon: "error",
            });
        }
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
                                    <th>Parent ID</th>
                                    <th>Child Ids</th>
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
                                            <td>
                                                {property?.childIds.map(
                                                    (id: number) => {
                                                        return <>{`${id} `}</>;
                                                    }
                                                )}
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
                                                        mergeHandler(property.propertyId)
                                                    }
                                                >
                                                    Approve
                                                </button>

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

export default AdminMergeProperties;
