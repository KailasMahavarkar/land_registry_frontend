import { faArrowsSplitUpAndLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import customToast from "../../toast";
import LandTokenVerify from "../LandTokenVerify";
import axios from "axios";
import produce from "immer";


const EmployeeSplitLandCase = () => {
    const [landToken, setLandToken] = useState(1);
    const [verifed, setVerified] = useState(false);
    const [totalSplits, setTotalSplits] = useState(2);
    const [data, setData] = useState<{
        ownerName: string;
        ownerAadhaarCardNumber: string;
        ownerPanCardNumber: string;
        surveyNumber: number;
        subSurveyNumber: number;
        propertyLength: number;
        propertyWidth: number;
    }[]>([])


    const formSubmitHandler = async () => {

        // loop through the data and validate the data
        // if any data is invalid then throw an error
        const invalidData = data.find((d) => {
            return (
                !d.ownerName ||
                !d.ownerAadhaarCardNumber ||
                !d.ownerPanCardNumber ||
                !d.surveyNumber ||
                !d.subSurveyNumber ||
                !d.propertyLength ||
                !d.propertyWidth
            )
        })

        if (invalidData) {
            return customToast({
                message: "Please fill all the fields",
                icon: "error",
            })
        }

        try {
            const result = await axios.post("/property/split", {
                propertyId: landToken,
                ownerName: data.map((d) => d.ownerName),
                propertyLength: data.map((d) => d.propertyLength),
                propertyWidth: data.map((d) => d.propertyWidth),
                ownerAadhaarCardNumber: data.map((d) => d.ownerAadhaarCardNumber),
                ownerPanCardNumber: data.map((d) => d.ownerPanCardNumber),
                surveyNumber: data.map((d) => d.surveyNumber),
                subSurveyNumber: data.map((d) => d.subSurveyNumber),

                documentDocId: [],
                documentHash: [],
                documentLink: [],
                documentName: [],
            })

            if (result) {
                setData(
                    Array.from({ length: totalSplits }).map((data: any, index: number) => {
                        return {
                            ownerName: "",
                            ownerAadhaarCardNumber: "",
                            ownerPanCardNumber: "",
                            surveyNumber: 0,
                            subSurveyNumber: 0,
                            propertyLength: 0,
                            propertyWidth: 0,
                        }
                    })
                )
            }

            return customToast({
                message: "Land Split Case Created",
                icon: "success",
            })

        } catch (error: any) {
            console.log("error", error)

            customToast({
                message: error.response.data.message,
                icon: "error",
            })
        }
    }

    useEffect(() => {
        setData(
            Array.from({ length: totalSplits }).map((data: any, index: number) => {
                return {
                    ownerName: "",
                    ownerAadhaarCardNumber: "",
                    ownerPanCardNumber: "",
                    surveyNumber: 0,
                    subSurveyNumber: 0,
                    propertyLength: 0,
                    propertyWidth: 0,
                }
            })
        )
    }, [totalSplits])

    return (
        <>
            <div>
                <h2>Split Land Case</h2>
                <div className="flex flex-col flex-end">
                    <div className="form-control max-w-md">
                        <LandTokenVerify
                            verified={verifed}
                            setVerified={setVerified}
                            landToken={landToken}
                            setLandToken={setLandToken}
                        />
                    </div>
                </div>
            </div>

            <div>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>

            {verifed &&
                <div>
                    <div className="flex flex-col flex-end">
                        <div className="form-control max-w-md">
                            <label htmlFor="land-split">
                                <span>Total land splits ?</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                placeholder="3"
                                value={totalSplits}
                                onChange={(e) =>
                                    setTotalSplits(parseInt(e.target.value))
                                }
                            />
                        </div>
                    </div>
                </div>
            }


            <div className="divider"></div>
            {verifed && (
                <>
                    <div className="flex flex-col flex-end mt-5">
                        <div className="overflow-x-auto">
                            {
                                Array.from({ length: totalSplits }).map(
                                    (color: any, index: number) => {
                                        return (
                                            <>
                                                <h1>
                                                    Split {index + 1} of {totalSplits}
                                                </h1>

                                                {/* Owner Name & Aadhar Card Number  */}
                                                <div className="flex justify-around w-full">
                                                    <div className="form-control w-full max-w-xs">
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Owner Name
                                                                <span className="text-red-500">
                                                                    {" *"}
                                                                </span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Type here"
                                                            className="input input-bordered w-full max-w-xs"
                                                            value={data[index].ownerName}
                                                            onChange={(e: any) => {
                                                                setData(
                                                                    produce(data, (draft) => {
                                                                        draft[index].ownerName = e.target.value;
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="form-control w-full max-w-xs">
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Aadhar Card Number
                                                                <span className="text-red-500">
                                                                    {" *"}
                                                                </span>
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Type here"
                                                            className="input input-bordered w-full max-w-xs"
                                                            value={data[index].ownerAadhaarCardNumber}
                                                            onChange={(e: any) => {
                                                                setData(
                                                                    produce(data, (draft) => {
                                                                        draft[index].ownerAadhaarCardNumber = e.target.value;
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* House & Length  */}
                                                <div className="flex justify-around w-full">
                                                    <div className="form-control w-full max-w-xs">
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Pan Number
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input input-bordered w-full max-w-xs"
                                                            value={data[index].ownerPanCardNumber}
                                                            onChange={(e: any) => {
                                                                setData(
                                                                    produce(data, (draft) => {
                                                                        draft[index].ownerPanCardNumber = e.target.value;
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="form-control w-full max-w-xs">
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Property Length
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="input input-bordered w-full max-w-xs"
                                                            value={data[index].propertyLength}
                                                            onChange={(e: any) => {
                                                                setData(
                                                                    produce(data, (draft) => {
                                                                        draft[index].propertyLength = Number(e.target.value);
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Width & Survey */}
                                                <div className="flex justify-around w-full">
                                                    <div className="form-control w-full max-w-xs">
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Property Width
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="input input-bordered w-full max-w-xs"
                                                            value={data[index].propertyWidth}
                                                            onChange={(e: any) => {
                                                                setData(
                                                                    produce(data, (draft) => {
                                                                        draft[index].propertyWidth = Number(e.target.value);
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="form-control w-full max-w-xs">
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Survey Number
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="input input-bordered w-full max-w-xs"
                                                            value={data[index].surveyNumber}
                                                            onChange={(e: any) => {
                                                                setData(
                                                                    produce(data, (draft) => {
                                                                        draft[index].surveyNumber = Number(e.target.value);
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Sub Survey */}
                                                <div className="flex justify-around w-full">
                                                    <div className="form-control w-full max-w-xs">
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Sub Survey Number
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="input input-bordered w-full max-w-xs"
                                                            value={data[index].subSurveyNumber}
                                                            onChange={(e: any) => {
                                                                setData(
                                                                    produce(data, (draft) => {
                                                                        draft[index].subSurveyNumber = Number(e.target.value);
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="form-control w-full max-w-xs">
                                                        <label className="label">

                                                        </label>

                                                    </div>
                                                </div>


                                                <div className="divider"></div>
                                            </>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div >

                    <div>
                        <button className="btn btn-primary m-2"
                            onClick={formSubmitHandler}
                        >
                            Split Lands
                            <FontAwesomeIcon
                                size="1x"
                                className="mx-2"
                                icon={faArrowsSplitUpAndLeft}
                            />
                        </button>
                    </div>
                </>
            )
            }
        </>
    );
};

export default EmployeeSplitLandCase;
