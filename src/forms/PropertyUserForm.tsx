import React from 'react'
import { propertyType } from '../types/type';

const PropertyUserForm = ({ property, setProperty }: {
    property: propertyType,
    setProperty: React.Dispatch<React.SetStateAction<propertyType>>
}) => {

    return (
        <div>
            {/* User Details */}
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
    )
}

export default PropertyUserForm