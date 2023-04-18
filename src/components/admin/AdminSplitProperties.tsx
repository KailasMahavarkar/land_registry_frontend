import axios from "axios";
import { useEffectAsync } from "../../helper";
import { useContext, useState } from "react";
import customToast from "../../toast";
import treeify from "treeify";
import CustomContext from "../../context/custom.context";

// uint256 _propertyId;
// string _createdOn;
// string[] _ownerName;
// uint256[] _propertyArea;
// string[] _ownerAadhaarCardNumber;
// string[] _ownerPanCardNumber;
// string[] _ownerAddressProofA;
// string[] _ownerAddressProofB;
// uint256[] _surveyNumber;
// uint256[] _subSurveyNumber;
// // documents
// string[] _documentsName;
// string[] _documentsHash;
// string[] _documentsLink;

interface PropertyCardProps {
    propertyId: number;
    ownerName: string[];

    propertyLength: number[];
    propertyWidth: number[];

    ownerAadhaarCardNumber: string[];
    ownerPanCardNumber: string[];
    surveyNumber: number[];
    subSurveyNumber: number[];

    documentDocId: string[];
    documentHash: string[];
    documentLink: string[];
    documentName: string[];
}

const AdminSplitProperties = () => {
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

    const splitHandler = async (
        propertyId: number,
        status: "approved" | "reject"
    ) => {
        const targetProperty: any = properties.find((property) => {
            return property.propertyId === propertyId;
        });

        if (!targetProperty) {
            return customToast({
                message: "Property not found",
                icon: "error",
            });
        }

        const struct = {
            propertyId: propertyId,
            createdOn: targetProperty.createdOn,
            ownerName: targetProperty.ownerName,
            propertyLength: targetProperty.propertyLength,
            propertyWidth: targetProperty.propertyWidth,
            ownerAadhaarCardNumber: targetProperty.ownerAadhaarCardNumber,
            ownerPanCardNumber: targetProperty.ownerPanCardNumber,
            surveyNumber: targetProperty.surveyNumber,
            subSurveyNumber: targetProperty.subSurveyNumber,

            documentDocId: targetProperty.documentDocId,
            documentName: targetProperty.documentName,
            documentHash: targetProperty.documentHash,
            documentLink: targetProperty.documentLink
        }

        try {
            const block = await drizzle.contracts.LandRegistry.methods
                .splitProperty(Object.values(struct))
                .send();

            // console.log("block -->", block);
            const landIds = block?.events?.sendPropertyId?.map((x: any) => {
                return x?.returnValues?._id
            })

            customToast(({
                message: `generated land ids are ${landIds?.join(", ")}`,
                icon: "success",
                timer: 10000
            }))

            await axios.patch("/property/split", {
                propertyId: propertyId,
                status: status,
            })


            const newProperties = properties.filter((property, index) => {
                return propertyId !== property.propertyId;
            });

            setProperties(newProperties);

        } catch (error) {

        }


    };

    const getProperties = async () => {
        try {
            const response = await axios.get("/property/split?status=pending");
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
                                    <th>Property Details</th>
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
                                                        splitHandler(
                                                            property.propertyId,
                                                            "approved"
                                                        )
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

export default AdminSplitProperties;
