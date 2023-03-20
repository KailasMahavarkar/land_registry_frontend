import { faArrowsSplitUpAndLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import customToast from "../../toast";
import useDrizzle from "../../hooks/useDrizzle";
import produce from "immer";
import axios from "axios";

type colorType = "red" | "blue" | "green" | "yellow" | "violet";

const EmployeeMergeLandCase = () => {
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

    const formSubmitHandler = async () => {
        // check if all the land tokens are verified
        if (allTokensVerified) {

            

            try {
                const result = await axios.post("/property/merge", {
                    propertyId: parentLand.landToken,
                    childIds: landTokens.map((landToken) => landToken.landToken),
                })

                if (result) {
                    customToast({
                        message: "Land merge request applied",
                        icon: "success",
                    });
                }
            } catch (error: any) {
                customToast({
                    message: error.response?.data?.msg,
                    icon: "error",
                });
            }
        } else {
            // show error
            customToast({
                message: "Please verify all the land tokens",
                icon: "error",
            });
        }
    }

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
            <div>
                <div className="form-control max-w-md ">
                    <label htmlFor="land-split">
                        <span>Parent Land Id</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered input-secondary "
                        value={parentLand.landToken}
                        onChange={(e) => {
                            setParentLand({
                                landToken: Number(e.target.value),
                                verified: false,
                            })
                        }}
                    />
                </div>
            </div>
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
                    {
                        !allTokensVerified && (
                            <button
                                className="btn btn-primary"
                                onClick={async () => {

                                    // validate the parent land token
                                    const parentLandTokenValid = await validateLandToken(parentLand.landToken);

                                    if (!parentLandTokenValid) {
                                        customToast({
                                            message: "Parent land token is invalid",
                                            icon: "error",
                                        })
                                        return;
                                    }

                                    // any child land token is invalid if it matches the parent land token
                                    const childLandTokenInvalid = landTokens.some((landToken) => landToken.landToken === parentLand.landToken);

                                    if (childLandTokenInvalid) {
                                        customToast({
                                            message: "Child land token cannot be parent",
                                            icon: "error",
                                        })
                                        return;
                                    }


                                    let allPromises: Promise<any>[] = [];

                                    for (let index = 0; index < landTokens.length; index++) {
                                        const land = landTokens[index];
                                        allPromises.push(validateLandToken(land.landToken));
                                    }

                                    const promisesResolved = await Promise.all(allPromises);

                                    // check if all the promises are resolved
                                    if (promisesResolved.every((promise) => promise === true)) {

                                        setAllTokensVerified(true);

                                        customToast({
                                            message: "All tokens are valid",
                                            icon: "success",
                                        })
                                    } else {
                                        // get 1st invalid token
                                        const invalidToken = promisesResolved.findIndex((promise) => promise === false);
                                        customToast({
                                            message: `Token ${invalidToken + 1} is invalid`,
                                            icon: "error",
                                        })
                                    }


                                }}
                            >
                                Verify All tokens
                            </button>
                        )
                    }

                </div>

                {allTokensVerified && (
                    <>
                        <div className="divider"></div>
                        <div>
                            <button
                                className="btn btn-success m-2"
                                onClick={formSubmitHandler}
                            >
                                Merge Lands
                                <FontAwesomeIcon
                                    size="1x"
                                    className="mx-2"
                                    icon={faArrowsSplitUpAndLeft}
                                />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default EmployeeMergeLandCase;
