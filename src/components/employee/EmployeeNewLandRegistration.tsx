import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import CustomContext from "../../context/custom.context";

const EmployeeNewLandRegistration = () => {
	const { drizzle, drizzleState } = useContext(CustomContext);
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

	const [property, setProperty] = useState({
		propertyHouseNumber: "",
		propertyStreetName: "",
		propertyType: "",
		propertyArea: 0,
		propertyPincode: 0,
		propertyState: "",
		propertyVillage: "",
		propertyDistrict: "",
		propertyTaluka: "",

		// owner details
		ownerName: "",
		aadharCardNumber: "",
		panCardNumber: "",
		addressProofA: "",
		addressProofB: "",
		// transfer details (if any)
		transfered: false,
		transferedTo: 0,
		transferedFrom: [],
		propertySplitLandId: [],
		// ownership details
		surveyNumber: 4096,
		subSurveyNumber: 4096,
		createdOn: "15-3-23",
	});

	// [
	// 	"JK house",
	// 	"route 66",
	// 	"residential",
	// 	800,
	// 	400070,
	// 	"maharashtra",
	// 	"mumbai",
	// 	"mumbai",
	// 	"mumbai",
	// 	"kailas",
	// 	"3782",
	// 	"DMN",
	// 	"light bill",
	// 	"ration card",
	// 	false,
	// 	5666736,
	// 	[],
	// 	[],
	// 	2048,
	// 	2048,
	// 	"15-3-23",
	// ];

	const registerPropertyHandler = () => {
		drizzle.contracts.LandRegistry.methods
			.registerNewProperty(property)
			.send();
	};

	const [termsAndConditions, setTermsAndConditions] = useState(true);
	const [fullverified, setFullverified] = useState(true);

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
								onChange={(e) => {
									setProperty(
										produce(property, (draft) => {
											draft.ownerName = e.target.value;
										})
									);
								}}
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
								onChange={(e) => {
									setProperty(
										produce(property, (draft) => {
											draft.aadharCardNumber =
												e.target.value;
										})
									);
								}}
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
								onChange={(e) => {
									setProperty({
										...property,
										propertyHouseNumber: e.target.value,
									});
								}}
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Street Name</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
									setProperty({
										...property,
										propertyStreetName: e.target.value,
									});
								}}
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
							<select
								className="select  select-bordered w-full max-w-xs"
								onChange={(e) => {
									setProperty({
										...property,
										propertyType: e.target.value,
									});
								}}
							>
								<option>residential</option>
								<option>commercial</option>
								<option>industrial</option>
							</select>
						</div>
					</div>

					{/* Area & Dimension */}
					<div className="flex justify-around w-full">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">
									Property Area(sq.ft)
									<span className="text-red-500">{" *"}</span>
								</span>
							</label>
							<input
								type="number"
								placeholder="300"
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
									setProperty({
										...property,
										propertyArea: Number(e.target.value),
									});
								}}
							/>
						</div>

						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">
									Property District
									<span className="text-red-500">{" *"}</span>
								</span>
							</label>
							<input
								type="text"
								defaultValue="mumbai"
								placeholder="Type here"
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
									setProperty({
										...property,
										propertyDistrict: e.target.value,
									});
								}}
							/>
						</div>
					</div>

					{/* Pincode & Taluka  */}
					<div className="flex justify-around w-full">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Pincode</span>
							</label>
							<input
								type="number"
								placeholder="eg. 400001"
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
									setProperty({
										...property,
										propertyPincode: Number(e.target.value),
									});
								}}
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Taluka</span>
							</label>
							<input
								type="number"
								placeholder="eg. Mumbai"
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
									setProperty({
										...property,
										propertyTaluka: e.target.value,
									});
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* Land Related Details */}
			{/* <div>
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
			</div> */}
			{/* Land Images */}
			{/* <div>
				<h4 className="ml-2">3) Land Images</h4>
				<div className="flex justify-center">
					<input
						type="file"
						className="custom-file-input w-full"
						multiple={true}
						onChange={(e: any) => {
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
			</div> */}
			{/* Owner Related Documents */}
			{/* <div>
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
			</div> */}
			{/* Land Related Details */}
			<div>
				<h4 className="ml-2">5) Agree terms and conditions </h4>
				<div className="flex shadow flex-col p-5">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Accept / Deny</span>
						</label>
						<input
							type="checkbox"
							className="checkbox"
							checked={termsAndConditions}
							onChange={(e) =>
								setTermsAndConditions(e.target.checked)
							}
						/>
						<span className="checkbox-mark"></span>
					</div>
				</div>
				<div className="flex justify-end w-full my-5">
					<button
						className="btn btn-primary"
						disabled={!termsAndConditions}
						onClick={() => {

                            registerPropertyHandler();
							Swal.fire({
								icon: "info",
								title: "Area Verification Request Submitted",
								text: "please wait 30 days for approval, our team will contact you soon for land verification",
								footer: "",
							});
						}}
					>
						Submit For Area Verification
						<FontAwesomeIcon
							icon={faArrowRight}
							className="mx-3"
							size="1x"
						/>
					</button>
				</div>
			</div>

			<div>
				{(termsAndConditions || true) && (
					<>
						<h4 className="ml-2">
							5) Everything has been verified and found to be
							correct{" "}
						</h4>
						<div className="flex shadow flex-col p-5">
							<div className="form-control">
								<input
									type="checkbox"
									className="toggle"
									checked={fullverified}
									onChange={(e) =>
										setFullverified(e.target.checked)
									}
								/>
								<span className="checkbox-mark"></span>
							</div>
						</div>
					</>
				)}
				{termsAndConditions && fullverified && (
					<div className="flex justify-end w-full my-5">
						<button
							className="btn btn-success"
							onClick={() => {
								setFullverified(true);

								Swal.fire({
									icon: "info",
									title: "Your Land has been added to blockchain",
									text: "",
									footer: "",
								});
							}}
						>
							Submit To Blockchain
							<FontAwesomeIcon
								icon={faArrowRight}
								className="mx-3"
								size="1x"
							/>
						</button>
					</div>
				)}
			</div>
		</>
	);
};



export default EmployeeNewLandRegistration;
