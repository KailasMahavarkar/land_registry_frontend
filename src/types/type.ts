import { type } from "os";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";

export type geoLocationType = {
    corners: Array<{
        lat: number;
        lng: number;
    }>;
    center: {
        lat: number;
        lng: number;
    };
};

export type updateType = {
    message: string;
    timestamp: number;
};

export type singleLandAttributeType = {
    token: string;

    // geolocation
    geoLocation: geoLocationType;

    // reference
    isPolygon: boolean;
    isRectangle: boolean;

    // owner details
    owner: string;
    ownerAddress: string;
    ownerEmail: string;
    ownerPhone: string;

    // owner document details
    ownerDocuments: {
        documentName: string;
        documentLinks: string[];
        documentHash: string;
        verified: boolean;
    }[];

    // land document details
    landDocuments: {
        documentName: string;
        documentHash: string;
        documentLinks: string[];
        verified: boolean;
    }[];

    landImages: {
        imageHash: string;
        imageLink: string;
    }[];

    // plot details
    price: number;
    status: string;
    description: string;

    // government details
    government: string;
    governmenttype: string;

    // updates
    updates: updateType[];

    // timestamps
    createdAt: number;
    updatedAt: number;
    deletedAt: number;

    isChainValid: boolean;
};

export interface simpleTreeInterface extends RawNodeDatum {
    attributes: {
        token: string;

        // reference
        isPolygon: boolean;
        isRectangle: boolean;

        // owner details
        owner: string;
        ownerAddress: string;
        ownerEmail: string;
        ownerPhone: string;

        // plot details
        price: number;
        status: string;
        description: string;

        // government details
        government: string;
        governmenttype: string;

        // timestamps
        createdAt: number;
        updatedAt: number;
        deletedAt: number;

        isChainValid: boolean;
    };
    children: simpleTreeInterface[];
    name: string;
}

export interface complexTreeInterface {
    attributes: singleLandAttributeType;
    children: complexTreeInterface[];
    name: string;
}

export type simpleBlockChainType = {
    chain: Array<simpleTreeInterface>;
    updatedAt: number;
    createAt: number;
};

export type complexBlockChainType = {
    chain: Array<complexTreeInterface>;
    updatedAt: number;
    createAt: number;
};

export type employeeRoleType = "employee" | "admin" | "scrutiny" | "support" | "unknown";
export type employeeStatus = "active" | "inactive" | "banned" | "deleted";
export type employeePermissionType =
    | "split"
    | "merge"
    | "transfer"
    | "register"

export type profileType = {
    _id: string;
    username: string;
    role: employeeRoleType;
    fullname: string;
    email: string;
    apikey: string;
    datejoined: string;
    status: employeeStatus;
    accessToken: string;
    refreshToken: string;
};

export type propertyType = {
    propertyHouseNumber: string;
    propertyStreetName: string;
    propertyType: string;
    propertyLength: number;
    propertyWidth: number;
    propertyPincode: number;
    propertyState: string;
    propertyVillage: string;
    propertyDistrict: string;
    propertyTaluka: string;
    // owner details
    ownerName: string;
    aadharCardNumber: string;
    panCardNumber: string;
    // transfer details (if any)
    transfered: boolean;
    transferedTo: number;
    transferedFrom: number[];
    propertySplitLandId: number[];
    // ownership details
    surveyNumber: number;
    subSurveyNumber: number;
    createdOn: string;
}

export interface singleDocument {
    docId: string;
    name: string;
    link: string;
    hash: string;
    verified: boolean;
    preview: File
}

export type singleUserType = {
    _id: string;
    fullname: string;
    email: string;
    username: string;
    password: string;
    role: employeeRoleType;
    permissions: {
        [key in employeePermissionType]: boolean;
    };
};
