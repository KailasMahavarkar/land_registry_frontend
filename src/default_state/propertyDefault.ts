import { propertyType, singleDocument } from "../types/type";

export const propertyDefault: propertyType = {
    propertyHouseNumber: "",
    propertyStreetName: "",
    propertyType: "residential",
    propertyLength: 0,
    propertyWidth: 0,
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