import { faArrowsSplitUpAndLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import customToast from "../../toast";
import useDrizzle from "../../hooks/useDrizzle";
import produce from "immer";
import axios from "axios";
import CustomContext from "../../context/custom.context";
import { propertyType, singleDocument } from "../../types/type";
import { propertyDefault } from "../../default_state/propertyDefault";
import PropertyForm from "../../forms/PropertyForm";
import PropertyUserForm from "../../forms/PropertyUserForm";
import ImageTable from "../ImageTable";

const EmployeeMergeLandCase = () => {
    const [property, setProperty] = useState<propertyType>(propertyDefault);
    const [documents, setDocuments] = useState<singleDocument[]>([]);


    // landTokens is an array of objects with landToken and verified
    const [landTokens, setLandTokens] = useState<{
        landToken: number;
        verified: boolean;
    }[]>([
        {
            landToken: 0,
            verified: false,
        }
    ]);

    const [allTokensVerified, setAllTokensVerified] = useState(false);

    const [parentLand, setParentLand] = useState({
        landToken: 0,
        verified: false,
    });


    const [landMergeCount, setLandMergeCount] = useState(2);
    const { validateLandToken } = useDrizzle();

    const formSubmitHandler = async (e: any) => {
        e.preventDefault();

        let allPromises: Promise<any>[] = [];

        for (let index = 0; index < landTokens.length; index++) {
            const land = landTokens[index];
            allPromises.push(validateLandToken(land.landToken));
        }

        const promisesResolved = await Promise.all(allPromises);

        // check if all the promises are resolved
        if (!promisesResolved.every((promise) => promise === true)) {
            // get 1st invalid token
            const invalidToken = promisesResolved.findIndex((promise) => promise === false);
            customToast({
                message: `Token ${invalidToken + 1} is invalid`,
                icon: "error",
            })
            return;

        } else {
            setAllTokensVerified(true);

            customToast({
                message: "All tokens are valid",
                icon: "success",
            })
        }

        const dataToSend = {
            ...property,
            transferedFrom: landTokens.map((x) => x.landToken),
            documents: documents.map((doc) => {
                return {
                    name: doc.name,
                    docId: doc.docId,
                    link: doc.link,
                    hash: doc.hash,
                    verified: doc.verified,
                };
            })
        }

        console.log(dataToSend);


        try {
            await axios.post("/property/merge", dataToSend);

            customToast({
                message: "Property Registration Applied",
                icon: "success",
            });
            setProperty(propertyDefault);
            setDocuments([]);
        } catch (err) {
            customToast({
                message: "Property Registration Error",
                icon: "error",
            });
        }
    };

    useEffect(() => {
        // set the landTokens array to the length of landMergeCount
        setLandTokens(
            Array(landMergeCount)
                .fill(0)
                .map((_, index) => {
                    return {
                        landToken: 0,
                        verified: false,
                    };
                })
        );

    }, [landMergeCount])

    return (
        <>
            <div className="flex flex-col flex-end">
                <div className="form-control max-w-md">
                    <label htmlFor="land-split">
                        <span>Land Merge count</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        value={landMergeCount}
                        onChange={(e) => {
                            setLandMergeCount(
                                Number(e.target.value as unknown as number)
                            );
                        }}
                    />
                </div>
            </div>
            <div className="divider"></div>
            <pre>
                {JSON.stringify(landTokens, null, 2)}
            </pre>

            {
                landTokens.length > 0 && (
                    <>

                        <PropertyUserForm
                            property={property}
                            setProperty={setProperty}
                        />
                        <PropertyForm
                            property={property}
                            setProperty={setProperty}
                        />
                        <ImageTable
                            documents={documents}
                            setDocuments={setDocuments}
                        />
                    </>
                )
            }

            <div className="flex flex-col flex-end mt-5">
                {
                    // loop through the array using array fill
                    Array(landMergeCount)
                        .fill(0)
                        .map((_, index) => {

                            return (
                                <div className="form-control max-w-md">
                                    <label htmlFor="land-split">
                                        <span>Land {index + 1}</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered"
                                        value={landTokens[index]?.landToken}
                                        onChange={(e) => {
                                            setLandTokens(
                                                produce(
                                                    landTokens,
                                                    (draft) => {
                                                        draft.map((landToken, landTokenIndex) => {
                                                            if (landTokenIndex === index) {
                                                                setAllTokensVerified(false);
                                                                landToken.landToken = Number(e.target.value);
                                                            }
                                                        })
                                                    }
                                                )
                                            )
                                        }}
                                    />
                                </div>
                            );
                        })}



                <div className="mt-5">
                    <button
                        className="btn btn-primary"
                        onClick={formSubmitHandler}
                    >
                        Submit Merge Request
                    </button>

                </div>

            </div>
        </>
    );
};

export default EmployeeMergeLandCase;
