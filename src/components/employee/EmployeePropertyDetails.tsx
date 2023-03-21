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

        const halfLen = Object.keys(data).length / 2;

        const keyData = Object.keys(data).splice(halfLen, halfLen * 2).map((property, index) => {
            return {
                [property]: data[property]
            }
        })
        setProperty(keyData)

    }, [token])

    return (
        <>
            <div className="mb-5">
                <h1>Get Property Details by token id</h1>
                <input
                    type="number"
                    className="input input-bordered"
                    placeholder="Case ID"
                    value={token}
                    onChange={(e) => {
                        setToken(Number(e.target.value));
                    }}
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