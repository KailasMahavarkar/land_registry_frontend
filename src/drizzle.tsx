const registerNewProperty = (drizzle: any) => {
	// input parameners
	// string ownerName;
	// string aadhaarCardNum;
	// string plotAddress;
	// uint256 area;
	// string createdOn;
	// string state;
	// string district;
	// string taluk;
	// string village;
	// string surveyNo;
	// string subSurveyNo;
	// uint256[] transferedFrom;
	drizzle.contracts.LandRegistry.methods
		.registerNewProperty({
			ownerName: "Lakshmikanth Mhetre",
			aadhaarCardNum: "1234 1234 1234",
			plotAddress: "563",
			area: 77,
			createdOn: "234234234",
			state: "Maharastra",
			district: "kolhapur",
			taluk: "hatkalangle",
			village: "ichalkaranji",
			surveyNo: "12",
			subSurveyNo: "123",
			transferedFrom: [],
		})
		.send(); // sets SimpleStorage contract's storedData state variable to uint 5.
	// drizzle.contracts.LandRegistry.methods.storedData.call(); // gets the storedData value
};


// const transferProperty = () => {
// 	(drizzle as any).contracts.LandRegistry.methods
// 		.transferOwnership([1], "sahil jaju", "666666666666")
// 		.send();
// };

const splitProperty = (drizzle: any) => {
	// uint256 _propertyId,
	// string memory _createdOn,
	// string[] memory _ownerName,
	// string[] memory _aadhaarCardNum,
	// string[] memory _plotAddress,
	// uint256[] memory _area,
	// string[] memory _surveyNo,
	// string[] memory _subSurveyNo
	(drizzle as any).contracts.LandRegistry.methods
		.splitProperty(
			2,
			"5555555",
			["sahil jaju", "harsh sarda"],
			["666666666666", "666666666667"],
			["temp", "temp"],
			[54, 45],
			["temp", "temp"],
			["temp", "temp"]
		)
		.send();
};


// const mergeProperties = () => {
// 	// string ownerName;
// 	// string aadhaarCardNum;
// 	// string plotAddress;
// 	// uint256 area;
// 	// string createdOn;
// 	// string state;
// 	// string district;
// 	// string taluk;
// 	// string village;
// 	// string surveyNo;
// 	// string subSurveyNo;
// 	// uint256[] transferedFrom;
// 	(drizzle as any).contracts.LandRegistry.methods
// 		.mergeProperties({
// 			ownerName: "Lakshmikanth Mhetre 2",
// 			aadhaarCardNum: "1234 1234 1234",
// 			plotAddress: "563",
// 			area: 77,
// 			createdOn: "234234234",
// 			state: "Maharastra",
// 			district: "kolhapur",
// 			taluk: "hatkalangle",
// 			village: "ichalkaranji",
// 			surveyNo: "12",
// 			subSurveyNo: "123",
// 			transferedFrom: [3, 4],
// 		})
// 		.send();
// };
