import produce from "immer";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import customToast from "../../toast";
import { singleDocument } from "../../types/type";
import ImageTable from "../ImageTable";

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

interface propertyType {
    propertyHouseNumber: string;
    propertyStreetName: string;
    propertyType: string;
    propertyWidth: number;
    propertyLength: number;
    propertyPincode: number;
    propertyState: string;
    propertyVillage: string;
    propertyDistrict: string;
    propertyTaluka: string;
    ownerName: string;
    aadharCardNumber: string;
    panCardNumber: string;
    transfered: boolean;
    transferedTo: number;

    transferedFrom: number[];
    propertySplitLandId: number[];
    surveyNumber: number;
    subSurveyNumber: number;

    createdOn: string;
}

const propertyDefault = {
    propertyHouseNumber: "",
    propertyStreetName: "",
    propertyType: "residential",
    propertyWidth: 0,
    propertyLength: 0,
    propertyPincode: 0,
    propertyState: "",
    propertyVillage: "",
    propertyDistrict: "",
    propertyTaluka: "",

    // owner details
    ownerName: "",
    aadharCardNumber: "",
    panCardNumber: "",
    // transfer details (if any)
    transfered: false,
    transferedTo: 0,
    transferedFrom: [],
    propertySplitLandId: [],
    // ownership details
    surveyNumber: 0,
    subSurveyNumber: 0,


    createdOn: new Date().toISOString(),
}

const EmployeeNewLandRegistration = () => {
    const [documents, setDocuments] = useState<singleDocument[]>([]);
    const [property, setProperty] = useState<propertyType>(propertyDefault);

    const formSubmitHandler = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("/property/register", {
                ...property,
                documents: documents.map((doc) => {
                    return {
                        name: doc.name,
                        docId: doc.docId,
                        link: doc.link,
                        hash: doc.hash,
                        verified: doc.verified,
                    };
                })
            });

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

    const [termsAndConditions, setTermsAndConditions] = useState(true);

    return (
        <>
            <form onSubmit={formSubmitHandler}>
                <div className="w-full items-center justify-center ">
                    <h2 className="text-center underline underline-offset-4 text-primary  m-2">
                        New Property Registration
                    </h2>
                    {/* <pre>{JSON.stringify(property, null, 2)}</pre> */}
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
                                    value={property.ownerName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => {
                                        setProperty({
                                            ...property,
                                            ownerName: e.target.value,
                                        });
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
                                    value={property.aadharCardNumber}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => {
                                        setProperty({
                                            ...property,
                                            aadharCardNumber: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        {/* Pan card */}
                        <div className="flex justify-around w-full">
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">
                                        Pan card Number
                                        <span className="text-red-500">{" *"}</span>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={property.panCardNumber}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => {
                                        setProperty({
                                            ...property,
                                            panCardNumber: e.target.value,
                                        });
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
                {/* Property Details */}
                <h4 className="ml-2 mt-5 my-2">2) Property Details</h4>
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
                                required={true}
                                value={property.propertyHouseNumber}
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
                                required={true}
                                value={property.propertyStreetName}
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
                            <select
                                required={true}
                                value={property.propertyState}
                                onChange={(e) => {
                                    setProperty({
                                        ...property,
                                        propertyState: e.target.value,
                                    });
                                }}
                                className="select  select-bordered w-full max-w-xs"
                            >
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
                                required={true}
                                value={property.propertyType}
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

                    {/* Pincode & Taluka  */}
                    <div className="flex justify-around w-full">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Pincode</span>
                            </label>
                            <input
                                type="number"
                                placeholder="eg. 400001"
                                required={true}
                                value={property.propertyPincode}
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
                                type="string"
                                placeholder="eg. Mumbai"
                                required={true}
                                value={property.propertyTaluka}
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

                    <div className="flex justify-around w-full">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Property District
                                </span>
                            </label>
                            <input
                                type="text"
                                defaultValue="mumbai"
                                placeholder="Type here"
                                required={true}
                                value={property.propertyDistrict}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    setProperty({
                                        ...property,
                                        propertyDistrict: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">village</span>
                            </label>
                            <input
                                type="string"
                                placeholder="eg. Mumbai"
                                required={true}
                                value={property.propertyVillage}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    setProperty({
                                        ...property,
                                        propertyVillage: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    {/* Length & Width */}
                    <div className="flex justify-around w-full">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Property Length (in feets)
                                    <span className="text-red-500">{" *"}</span>
                                </span>
                            </label>
                            <input
                                type="number"
                                placeholder="300"
                                required={true}
                                value={property.propertyLength}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    setProperty({
                                        ...property,
                                        propertyLength: Number(e.target.value),
                                    });
                                }}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Property Width (in feets)
                                    <span className="text-red-500">{" *"}</span>
                                </span>
                            </label>
                            <input
                                type="number"
                                placeholder="300"
                                required={true}
                                value={property.propertyWidth}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    setProperty({
                                        ...property,
                                        propertyWidth: Number(e.target.value),
                                    });
                                }}
                            />
                        </div>
                    </div>

                    {/* Survey Number & Sub Survey Number */}
                    <div className="flex justify-around w-full">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Survey Number
                                    <span className="text-red-500">{" *"}</span>
                                </span>
                            </label>
                            <input
                                type="number"
                                placeholder="300"
                                required={true}
                                value={property.surveyNumber}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    setProperty({
                                        ...property,
                                        surveyNumber: Number(e.target.value),
                                    });
                                }}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Sub Survey Number
                                    <span className="text-red-500">{" *"}</span>
                                </span>
                            </label>
                            <input
                                type="number"
                                placeholder="300"
                                required={true}
                                value={property.subSurveyNumber}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    setProperty({
                                        ...property,
                                        subSurveyNumber: Number(e.target.value),
                                    });
                                }}
                            />
                        </div>
                    </div>

                    {/* Area */}
                    <div className="flex justify-around w-full">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Property Area (sq.ft)
                                    <span className="text-red-500">{" *"}</span>
                                </span>
                            </label>
                            <input
                                type="number"
                                value={
                                    property.propertyWidth *
                                    property.propertyLength
                                }
                                className="input input-bordered w-full max-w-xs"
                                disabled={true}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">

                            </label>

                        </div>
                    </div>

                </div>
                {/* Land Related Details */}
                <div>
                    <h4 className="ml-2 my-3">3) Land Related Documents</h4>
                    <div className="flex shadow flex-col p-5">
                        <ImageTable
                            documents={documents}
                            setDocuments={setDocuments}
                        />
                    </div>
                </div>

                {/* Terms and conditions */}
                <div>
                    <h4 className="ml-2 my-2">4) Agree terms and conditions </h4>
                    <div className="flex shadow flex-col p-5">
                        <div className="form-control">
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
                        <input
                            type="submit"
                            value="Submit for Admin Approval "
                            className="btn btn-primary"
                            disabled={!termsAndConditions}
                        />
                    </div>
                </div>
            </form >
        </>
    );
};

export default EmployeeNewLandRegistration;
