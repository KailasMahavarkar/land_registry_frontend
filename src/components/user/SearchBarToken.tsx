import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { simpleChain } from "../../data/dummy.data";
import useDrizzle from "../../hooks/useDrizzle";

const SearchBarToken = () => {
    const [token, setToken] = useState("");
    const [details, setDetails] = useState({});
    const drizzle = useDrizzle();

    const tokenSearchHandler = async (e: any) => {
        e.preventDefault();

        const details = await drizzle.getProperty(Number(token) || 2);

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

            {
                details && (
                    <>
                        <pre>
                            {JSON.stringify(details, null, 2)}
                        </pre>
                    </>
                )
            }

            {/* {
                details && (
                    <div>
                        {
                            Object.keys(details).map((key, index) => {
                                return (
                                    <div>
                                        <p>{key}: {details[key]}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            } */}

            {/* {search && (
                <div className="">
                    {simpleChain.chain.map((land, index) => {
                        const { attributes, children } = land;

                        return (
                            <>
                                <div
                                    key={index}
                                    className="flex card card-side bg-base-100 shadow-xl items-center justify-center "
                                >
                                    <figure>
                                        <img
                                            src="https://placehold.jp/000000/ffffff/300x200.png?text=Property"
                                            alt="Movie"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            Owned by: {attributes?.owner}
                                        </h2>
                                        <p>Token: {attributes?.token}</p>
                                        <div className="card-actions justify-end">
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-active"
                                                    onClick={() =>
                                                        navigate(
                                                            `/search/${token}`
                                                        )

                                                    }
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            )} */}
        </div>
    );
};

export default SearchBarToken;
