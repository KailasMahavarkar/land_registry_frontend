import React from 'react'
import useDrizzle from '../hooks/useDrizzle';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import customToast from '../toast';

const LandTokenVerify = ({
    landToken, setLandToken,
    verified, setVerified
}: {
    landToken: number
    verified: boolean,
    setLandToken: React.Dispatch<React.SetStateAction<number>>,
    setVerified: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const { validateLandToken } = useDrizzle();

    return (
        <>
            <h3 className={`ml-2 ${verified ? "text-green-500" : ""}`}>
                1) Verify Land Token
                {
                    verified && (
                        <FontAwesomeIcon
                            className="ml-2"
                            color="#00ff00"
                            icon={faCheck} />
                    )
                }

            </h3>


            <input
                type="number"
                className="input input-bordered"
                placeholder="Case ID"
                value={landToken}
                onChange={(e) => {
                    setLandToken(Number(e.target.value));
                }}
            />
            <div className="flex justify-end ">
                <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={async () => {
                        if (await validateLandToken(landToken)) {
                            setVerified(true);
                        } else {
                            customToast({
                                message: "Invalid Land Token",
                                icon: "error",
                            });
                        }
                    }}
                >
                    Click to Verify
                </button>
            </div>
        </>
    )
}

export default LandTokenVerify