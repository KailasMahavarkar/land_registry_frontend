import produce from "immer";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import customToast from "../../toast";
import { propertyType, singleDocument } from "../../types/type";
import ImageTable from "../ImageTable";
import PropertyUserForm from "../../forms/PropertyUserForm";
import { propertyDefault } from "../../default_state/propertyDefault";
import PropertyForm from "../../forms/PropertyForm";


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
                    <pre>{JSON.stringify(property, null, 2)}</pre>
                </div>

                <PropertyUserForm
                    property={property}
                    setProperty={setProperty}
                />

                {/* Property Details */}
                <PropertyForm
                    property={property}
                    setProperty={setProperty}
                />

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
