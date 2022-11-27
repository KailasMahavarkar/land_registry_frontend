import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useState } from "react";
import DatePicker from "react-datepicker";

const EmployeeNewLandRegistration = () => {
	const [startDate, setStartDate] = useState(new Date());

	const [landDocuments, setLandDocuments] = useState<{
		[key: string]: any;
	}>({
		saleAgreement: "",
		saleDeed: "",
		digitalROR: "",
		surveyPlan: "",
	});

	const [landImages, setLandImages] = useState<any>([]);

	const states = [
		"Andhra Pradesh",
		"Arunachal Pradesh",
		"Assam",
		"Bihar",
		"Chaattisgarh",
		"Goa",
		"Gujarat",
		"Haryana",
		"Himachal Pradesh",
		"Jharkhand",
		"Karnataka",
		"Kerala",
		"Madhya Pradesh",
		"Maharashtra",
		"Manipur",
		"Meghalaya",
		"Mizoram",
		"Nagaland",
		"Odisha",
		"Punjab",
		"Rajasthan",
		"Sikkim",
		"Tamil Nadu",
		"Telangana",
		"Tripura",
		"Uttarakhand",
		"Uttar Pradesh",
		"West Bengal",
	];

	const [entityDocuments, setEntityDocuments] = useState<{
		[key: string]: any;
	}>({
		aadharCard: "",
		panCard: "",
		addressProof: "",
		addressProof2: "",
	});

	return (
		<>
			<div className="w-full items-center justify-center ">
				<h2 className="text-center underline underline-offset-4 text-primary  m-2">
					New Property Registration
				</h2>
			</div>
			{/* User Details */}
			<div>
				<h4 className="ml-2">1) User Details</h4>
				<div className="flex shadow flex-col p-5">
					{/* Name & Age */}
					<div className="flex justify-around w-full">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">
									Name
									<span className="text-red-500">{" *"}</span>
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
									<span className="text-red-500">{" *"}</span>
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
								onChange={(date: any) => setStartDate(date)}
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
									<span className="text-red-500">{" *"}</span>
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
								<span className="label-text">House Number</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Street Name</span>
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
								<span className="label-text">Pincode</span>
							</label>
							<input
								type="number"
								placeholder="eg. 400001"
								className="input input-bordered w-full max-w-xs"
							/>
						</div>

						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">District</span>
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

			{/* Property Details */}
			<div>
				<h4 className="ml-2">2) Property Details</h4>
				<div className="flex shadow flex-col p-5">
					{/* House & Street  */}
					<div className="flex justify-around w-full">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">House Number</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Street Name</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
					</div>

					{/* State */}
					<div className="flex justify-around w-full">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">
									State
									<span className="text-red-500">{" *"}</span>
								</span>
							</label>
							<select className="select  select-bordered w-full max-w-xs">
								{states.map((state) => (
									<option key={state}>{state}</option>
								))}
							</select>
						</div>

						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">
									Property Type
									<span className="text-red-500">{" *"}</span>
								</span>
							</label>
							<select className="select  select-bordered w-full max-w-xs">
								<option>Residential</option>
								<option>Commercial</option>
								<option>Industrial</option>
							</select>
						</div>
					</div>

					{/* Property Dimension */}
					<div className="flex justify-around w-full">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">
									Property Area
									<span className="text-red-500">{" *"}</span>
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
									Property Floor
									<span className="text-red-500">{" *"}</span>
								</span>
							</label>
							<input
								type="number"
								defaultValue="Base"
								placeholder="Type here"
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
					</div>

					{/* DOB & Gender  */}
					<div className="flex justify-around w-full">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Pincode</span>
							</label>
							<input
								type="number"
								placeholder="eg. 400001"
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">District</span>
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

			{/* Land Related Details */}
			<div>
				<h4 className="ml-2">3) Land Related Documents</h4>
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
								{Object.keys(landDocuments).map(
									(doc, index) => {
										return (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{doc}</td>
												<td>
													<input
														type="file"
														className="custom-file-input"
														onChange={(e) => {
															setLandDocuments(
																// prettier-ignore
																produce(landDocuments, (draft: any) => {

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
													{landDocuments[doc] ? (
														<img
															className="w-20 h-20"
															src={URL.createObjectURL(
																landDocuments[
																	doc
																]
																	? landDocuments[
																			doc
																	  ]
																	: ""
															)}
															alt="preview"
														/>
													) : (
														<p>No file selected</p>
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

			{/* Land Images */}
			<div>
				<h4 className="ml-2">3) Land Images</h4>
				<div className="flex justify-center">
					<input
						type="file"
						className="custom-file-input w-full"
						multiple={true}
						onChange={(e: any) => {
							// loop through all the files and add them to the array
							if (e.target.files) {
								for (
									let i = 0;
									i < e.target.files.length;
									i++
								) {
									setLandImages((prev: any) => [
										...prev,
										e.target.files[i],
									]);
								}
							}
						}}
					/>
				</div>
				{landImages.length > 0 && (
					<div className="flex shadow flex-col p-5">
						{/* show images as grid */}
						<div className="grid grid-cols-3 gap-4">
							{landImages.map((image: any, index: any) => {
								return (
									<div
										key={index}
										className="flex border-2 items-center justify-center "
									>
										<img
											className="max-w-[200px] max-h-[300px]"
											src={URL.createObjectURL(image)}
											alt="preview"
										/>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>

			{/* Owner Related Documents */}
			<div>
				<h4 className="ml-2">4) Owner Related Documents</h4>
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
														onChange={(e) => {
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
													{entityDocuments[doc] ? (
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
														<p>No file selected</p>
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
					Submit New Record
					<FontAwesomeIcon
						icon={faArrowRight}
						className="mx-3"
						size="1x"
					/>
				</button>
			</div>
		</>
	);
};

export default EmployeeNewLandRegistration;
