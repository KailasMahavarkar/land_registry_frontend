import React from 'react'
import { propertyType } from '../types/type'
import { states } from '../data/states.data'

const PropertyForm = ({
    property,
    setProperty,
}: {
    property: propertyType
    setProperty: React.Dispatch<React.SetStateAction<propertyType>>
}) => {
    return (
        <>
            <h4 className="ml-2 mt-5 my-2">2) Property Details</h4>
            <div className="flex shadow flex-col p-5">
                {/* House & Street  */}
                <div className="flex justify-around w-full">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Land Number</span>
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
                            //   defaultValue={states[0]}  
                            value={property.propertyState}
                            onChange={(e) => {

                                setProperty({
                                    ...property,
                                    propertyState: e.target.value,
                                });
                            }}
                            className="select  select-bordered w-full max-w-xs"
                        >
                            {["", ...states].map((state) => (
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
        </>
    )
}

export default PropertyForm