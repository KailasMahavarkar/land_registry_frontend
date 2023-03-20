import { useState } from "react"
import LandTokenVerify from "../LandTokenVerify"
import useDrizzle from "../../hooks/useDrizzle"
import { useEffectAsync } from "../../helper"
import treeify from "treeify";

const EmployeePropertyDetails = () => {
    const [token, setToken] = useState<number>(0)
    const [verified, setVerified] = useState<boolean>(false)
    const { getProperty } = useDrizzle();
    const [property, setProperty] = useState<any>({})

    useEffectAsync(async () => {
        const data = (await getProperty(token));
        setProperty({
            aadharCardNumber: data[0],
            createdOn: data[1],
            length: data[2],
            ownerName: data[3],
            panCardNumber: data[4],
            propertyDistrict: data[5],
            propertyHouseNumber: data[6],

            propertyLength: data[7],
            propertyPincode: data[8],
            propertySplitLandId: data[9],
            propertyState: data[10],
            propertyStreetName: data[11],
            propertyTaluka: data[12],
            propertyType: data[13],

            propertyVillage: data[14],
            propertyWidth: data[15],
            subSurveyNumber: data[16],
            surveyNumber: data[17],
            transfered: data[18],
            transferedFrom: data[19],
            transferedTo: data[20],
        })

    }, [token])

    return (
        <>
            <div>
                <h1>Get Property Details by token id</h1>
                <LandTokenVerify
                    landToken={token}
                    setLandToken={setToken}
                    verified={verified}
                    setVerified={setVerified}
                />
            </div>
            <div>
                <h1>Get Property Details by token id</h1>
                <pre>
                    {treeify.asTree(property as any,
                        true,
                        true
                    )}
                </pre>

            </div>
        </>

    )
}

export default EmployeePropertyDetails