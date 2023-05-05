import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useDrizzle from "../../hooks/useDrizzle";

export interface singleDocument {
    docId: string;
    name: string;
    link: string;
    hash: string;
    verified: boolean;
    preview: File
}
const SingleImageCard = ({ image: singleDocument }: any) => {
    return (
        <div className="card shadow-lg border-2 rounded-none m-2 " >
            <img
                className="m-auto w-full max-w-[300px]"
                src={singleDocument.link}
                alt="image"
            />
            <div className="card-body my-0">
                <h2 className="card-title">{singleDocument.name}</h2>
                <p className="card-text">{singleDocument.hash}</p>
                <div className={`badge ${singleDocument.verified ? "badge-success": "badge-warning"} `}>
                    {singleDocument.verified ? "Verified" : "Not Verified"}
                </div>
            </div>
        </div>
    );
}

const MultiImageCards = ({ images }: any) => {
    return (
        <div className="flex flex-wrap justify-center">
            {images.map((image: any, index: number) => {
                return (
                    <SingleImageCard
                        key={index}
                        image={image}
                    />
                );
            })}
        </div>
    );
}

const ObjectToJSXTable = (obj: any) => {
    const keys = Object.keys(obj);

    return (
        <table className="table max-w-xl">
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {/* when no values are present ignore keys */}
                {keys.map((key) => {

                    if (key === 'documentNames') {
                        console.log("docNames -->", obj[key])
                        return (
                            <tr key={key}>
                                <td>{key}</td>
                                <td className="max-w-md overflow-hidden " >
                                    <MultiImageCards images={obj[key]} />
                                </td>
                            </tr>
                        )
                    }

                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td className="max-w-md overflow-hidden " >{obj[key] || "empty"}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table >
    );
};

const SearchBarToken = () => {
    const [token, setToken] = useState("");
    const [details, setDetails] = useState({});
    const drizzle = useDrizzle();

    const tokenSearchHandler = async (e: any) => {
        e.preventDefault();

        const details = await drizzle.getProperty(Number(token) || 2);

        if (details.propertyLength === "0") {
            setDetails({});
            return
        }

        const keyNames = [
            "propertyHouseNumber",
            "propertyStreetName",
            "propertyType",
            "propertyLength",
            "propertyWidth",
            "propertyPincode",
            "propertyState",
            "propertyVillage",
            "propertyDistrict",
            "propertyTaluka",
            "ownerName",
            "aadharCardNumber",
            "panCardNumber",
            "transfered",
            "transferedTo",
            "transferedFrom",
            "propertySplitLandId",
            "surveyNumber",
            "subSurveyNumber",
            "createdOn",
            "documentNames",
            "documents",
        ]

        const property: any = {};

        details?.forEach((detail: any, index: any) => {
            property[keyNames[index]] = detail
        })

        setDetails(property);
    };


    return (
        <div className="flex flex-col  min-h-[100vh] items-center justify-center prose max-w-none ">
            <div className="flex child:m-2">
                <h1>Search Land by Token</h1>
                <FontAwesomeIcon icon={faSearch} size="2x" />
            </div>

            <input
                type="text"
                className="input input-bordered w-1/2 mt-5 rounded-full"
                placeholder="Enter Land Token"
                value={token}
                autoComplete="on"
                onChange={(e) => {
                    setToken(e.target.value);
                }}
            />

            <div className="flex w-full items-center justify-center ">
                <div
                    className="btn btn-primary px-[10px] mt-5 "
                    onClick={tokenSearchHandler}
                >
                    Submit
                </div>
            </div>

            <div className="flex flex-col w-full items-center justify-center mt-5">
                <h1>Land Details</h1>
                {Object.keys(details).length > 0 ? (
                    ObjectToJSXTable(details)
                ) : (
                    <h1>No Land Details Found</h1>
                )}

            </div>
        </div>
    );
};

export default SearchBarToken;
