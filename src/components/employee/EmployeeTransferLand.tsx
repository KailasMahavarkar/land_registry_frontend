import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import customToast from "../../toast";
import CustomContext from "../../context/custom.context";
import { singleDocument } from "../../types/type";
import ImageTable from "../ImageTable";
import axios from "axios";
import useDrizzle from "../../hooks/useDrizzle";
import LandTokenVerify from "../LandTokenVerify";
const EmployeeTranferLand = () => {

    // both landToken and verified are required 
    const [landToken, setLandToken] = useState(0);
    const [verifed, setVerified] = useState(false);


    const [documents, setDocuments] = useState<singleDocument[]>([]);

    const { drizzle } = useContext(CustomContext);
    const drizzleMethods = drizzle.contracts.LandRegistry.methods;

    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(true);

    const [newOwnerDetails, setNewOwnerDetails] = useState({
        newOwnerName: "",
        newOwnerAadhaarCardNumber: "",
        newOwnerPanCardNumber: "",
    });



    const formSubmitHandler = async () => {
        try {
            const result = await axios.post("/property/transfer", {
                propertyId: landToken,
                newOwnerName: newOwnerDetails.newOwnerName,
                newOwnerAadhaarCardNumber: newOwnerDetails.newOwnerAadhaarCardNumber,
                newOwnerPanCardNumber: newOwnerDetails.newOwnerPanCardNumber,
                documents: documents.map((doc) => {
                    return {
                        docId: doc.docId,
                        name: doc.name,
                        link: doc.link,
                        hash: doc.hash,
                        verifed: doc.verified,
                    };
                }),
            })

            customToast({
                message: "Property transfer request sent",
                icon: "success",
            });

            // clear form
            setLandToken(0);
            setNewOwnerDetails({
                newOwnerName: "",
                newOwnerAadhaarCardNumber: "",
                newOwnerPanCardNumber: "",
            })
            setDocuments([]);

        } catch (error: any) {
            console.log("error", error)

            customToast({
                message: error.response.data.message,
                icon: "error",
            })
        }

    }

    return (
        <>
            <div>
                <div className="flex flex-col flex-end">
                    <div className="w-full items-center justify-center ">
                        <h2 className="text-center underline underline-offset-4 text-primary  m-2">
                            Transfer Land
                        </h2>
                    </div>

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
            {verifed && (
                <>
                    <div>
                        <h4 className="ml-2">2) Buyer Details (new owner details)</h4>
                        <div className="flex shadow flex-col p-5">
                            {/* Name & Age */}
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
                                        value={newOwnerDetails.newOwnerName}
                                        onChange={(e) => {
                                            setNewOwnerDetails(
                                                produce(newOwnerDetails, (draft) => {
                                                    draft.newOwnerName = e.target.value;
                                                })
                                            );
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
                                        value={newOwnerDetails.newOwnerAadhaarCardNumber}
                                        onChange={(e) => {
                                            setNewOwnerDetails(
                                                produce(newOwnerDetails, (draft) => {
                                                    draft.newOwnerAadhaarCardNumber = e.target.value;
                                                })
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            {/* House & Street  */}
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
                                        value={newOwnerDetails.newOwnerPanCardNumber}
                                        onChange={(e) => {
                                            setNewOwnerDetails(
                                                produce(newOwnerDetails, (draft) => {
                                                    draft.newOwnerPanCardNumber = e.target.value;
                                                })
                                            );
                                        }}
                                    />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                    </label>
                                </div>

                            </div>


                        </div>
                    </div>

                    <ImageTable
                        documents={documents}
                        setDocuments={setDocuments}
                    />

                    {/* <div>
						<h4 className="ml-2">3) Buyer Documents</h4>
						<div className="flex shadow flex-col p-5">
							<div className="overflow-x-auto">
								<table className="table w-full">
									<thead>
										<tr>
											<th></th>
											<th>Name</th>
											<th>Uploader</th>
											<th>Preview</th>
										</tr>
									</thead>
									<tbody>
										{Object.keys(entityDocuments).map(
											(doc, index) => {
												return (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{doc}</td>
														<td>
															<input
																type="file"
																className="custom-file-input"
																onChange={(
																	e
																) => {
																	setEntityDocuments(
																		// prettier-ignore
																		produce(entityDocuments, (draft: any) => {

                                                                // allow only image files
                                                                if (e.target.files && e.target.files[0].type.includes('image')) {
                                                                    draft[doc] = e.target.files[0];
                                                                }
                                                            })
																	);
																}}
															/>
														</td>
														<td>
															{entityDocuments[
																doc
															] ? (
																<img
																	className="w-20 h-20"
																	src={URL.createObjectURL(
																		entityDocuments[
																			doc
																		]
																			? entityDocuments[
																					doc
																			  ]
																			: ""
																	)}
																	alt="preview"
																/>
															) : (
																<p>
																	No file
																	selected
																</p>
															)}
														</td>
													</tr>
												);
											}
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div> */}

                    {/* <div className="form-control max-w-md">
						<h6 className="ml-2">
							4) Verify OTP of previous seller
						</h6>
						<input
							type="text"
							className="input input-bordered"
							placeholder=""
							onChange={(e) => setOtp(e.target.value)}
						/>
						<div className="flex justify-end ">
							<button
								className="btn btn-primary btn-sm m-2"
								onClick={(e) => {
									if (otp === "5555") {
										setOtpVerified(true);

										customToast({
											icon: "success",
											message: "OTP verified",
										});
									} else {
										customToast({
											icon: "error",
											message: "Invalid OTP",
										});
									}
								}}
							>
								verify
							</button>
						</div>
					</div> */}

                    {otpVerified && (
                        <div className="flex justify-end w-full my-5">
                            <button
                                className="btn btn-primary"
                                onClick={formSubmitHandler}
                            >
                                Tranfer Record
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="mx-3"
                                    size="1x"
                                />
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default EmployeeTranferLand;
