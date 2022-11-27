import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useState } from "react";
import DatePicker from "react-datepicker";
const EmployeeTranferLand = () => {
	const [startDate, setStartDate] = useState(new Date());

	const [verifed, setVerified] = useState(false);

	const [entityDocuments, setEntityDocuments] = useState<{
		[key: string]: any;
	}>({
		aadharCard: "",
		panCard: "",
		addressProof: "",
	});

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
						<h3 className="ml-2">1) Verify Land Token</h3>
						<input
							type="text"
							className="input input-bordered"
							placeholder="Case ID"
						/>
						<div className="flex justify-end ">
							<button
								className="btn btn-primary btn-sm m-2"
								onClick={() => setVerified(true)}
							>
								Click to Verify
							</button>
						</div>
					</div>
				</div>
			</div>
			{verifed && (
				<>
					<div>
						<h4 className="ml-2">2) Buyer Details</h4>
						<div className="flex shadow flex-col p-5">
							{/* Name & Age */}
							<div className="flex justify-around w-full">
								<div className="form-control w-full max-w-xs">
									<label className="label">
										<span className="label-text">
											Name
											<span className="text-red-500">
												{" *"}
											</span>
										</span>
									</label>
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered w-full max-w-xs"
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
									/>
								</div>
							</div>

							{/* DOB & Gender  */}
							<div className="flex justify-around w-full">
								<div className="form-control w-full max-w-xs">
									<label className="label">
										<span className="label-text">
											Date of Birth
										</span>
									</label>
									<DatePicker
										className="input input-bordered w-full max-w-xs"
										selected={startDate}
										onChange={(date: any) =>
											setStartDate(date)
										}
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
									/>
								</div>

								<div className="form-control w-full max-w-xs">
									<label className="label">
										<span className="label-text">
											Gender
											<span className="text-red-500">
												{" *"}
											</span>
										</span>
									</label>
									<select className="select  select-bordered w-full max-w-xs">
										<option>Male</option>
										<option>Female</option>
										<option>Others</option>
									</select>
								</div>
							</div>

							{/* House & Street  */}
							<div className="flex justify-around w-full">
								<div className="form-control w-full max-w-xs">
									<label className="label">
										<span className="label-text">
											House Number
										</span>
									</label>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
									/>
								</div>
								<div className="form-control w-full max-w-xs">
									<label className="label">
										<span className="label-text">
											Street Name
										</span>
									</label>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
									/>
								</div>
							</div>

							{/* DOB & Gender  */}
							<div className="flex justify-around w-full">
								<div className="form-control w-full max-w-xs">
									<label className="label">
										<span className="label-text">
											Pincode
										</span>
									</label>
									<input
										type="number"
										placeholder="eg. 400001"
										className="input input-bordered w-full max-w-xs"
									/>
								</div>

								<div className="form-control w-full max-w-xs">
									<label className="label">
										<span className="label-text">
											District
										</span>
									</label>
									<input
										type="number"
										placeholder="eg. Mumbai"
										className="input input-bordered w-full max-w-xs"
									/>
								</div>
							</div>
						</div>
					</div>

					<div>
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
					</div>
					<div className="flex justify-end w-full my-5">
						<button className="btn btn-primary">
							Tranfer Record
							<FontAwesomeIcon
								icon={faArrowRight}
								className="mx-3"
								size="1x"
							/>
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default EmployeeTranferLand;
