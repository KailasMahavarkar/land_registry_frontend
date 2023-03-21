import axios from "axios";
import { useEffectAsync } from "../../helper";
import { useContext, useState } from "react";
import customToast from "../../toast";
import treeify from "treeify";
import CustomContext from "../../context/custom.context";
import useDrizzle from "../../hooks/useDrizzle";
import { propertyType } from "../../types/type";
import { propertyDefault } from "../../default_state/propertyDefault";



const AdminMergeProperties = () => {
    const { drizzle } = useContext(CustomContext);
    const { getProperty } = useDrizzle();

    const [properties, setProperties] = useState<propertyType[]>([]);
    const [previousProperties, setPreviousProperties] = useState<any>([]);

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
            return (property as any)._id === propertyId;
        });

        if (!targetProperty) {
            return customToast({
                message: "Property not found",
                icon: "error",
            });
        }

        let allPromises: Promise<any>[] = [];

        for (let index = 0; index < targetProperty?.transferedFrom.length; index++) {
            allPromises.push(
                getProperty(targetProperty?.transferedFrom[index])
            )
        }

        const promisesResolved = await Promise.all(allPromises)
        setPreviousProperties(promisesResolved);

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

            documents: (targetProperty as any).documents.map((document: any) => {
                return {
                    docId: document.docId,
                    hash: document.hash,
                    name: document.name,
                    link: document.link,
                    verified: document.verified,
                };
            })
        }

        try {
            const result = await drizzle.contracts.LandRegistry.methods
                .mergeProperties(Object.values(property))
                .send();

            if (!result) {
                return customToast({
                    message: "Transaction failed",
                    icon: "error",
                });
            }

            axios.patch("/property/merge", {
                _id: (targetProperty as any)._id,
                status: "approved",
            }).then((response) => {
                const newProperties = properties.filter((property, index) => {
                    return (property as any)._id !== propertyId;
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

        // try {

        //     customToast({
        //         message: "Merge Successful",
        //         icon: "success",
        //     });
        // } catch (error: any) {
        //     customToast({
        //         message: "Something went wrong while merging properties",
        //         icon: "error",
        //     })
        // }
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
                                            <td>{(property as any)._id}</td>
                                            <td>
                                                {property?.transferedFrom.map(
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
                                                        mergeHandler((property as any)._id)
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
