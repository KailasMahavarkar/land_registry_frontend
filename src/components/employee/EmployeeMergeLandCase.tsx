import { faArrowsSplitUpAndLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useState } from "react";
import { useEffectAsync } from "../../helper";
import customToast from "../../toast";

type colorType = "red" | "blue" | "green" | "yellow" | "violet";

const EmployeeMergeLandCase = () => {
	const [verifed, setVerified] = useState(false);

	const [activeColor, setActiveColor] = useState<colorType>("red");

	const [landInputs, setLandInputs] = useState([]);
	const [landCount, setLandCount] = useState(0);

	return (
		<>
			<h2>Merge Land Case</h2>
			<div className="flex flex-col flex-end">
				<div className="form-control max-w-md">
					<label htmlFor="land-split">
						<span>Land Merge count</span>
					</label>
					<input
						type="number"
						className="input input-bordered"
						onChange={(e) => {
							setLandCount(
								Number(e.target.value as unknown as number)
							);
						}}
					/>
				</div>
			</div>
			<div className="divider"></div>
			<div className="flex flex-col flex-end mt-5">
				{[...Array(landCount)].map((_, index) => {
					return (
						<div className="form-control max-w-md">
							<label htmlFor="land-split">
								<span>Land {index + 1}</span>
							</label>
							<input
								type="number"
								className="input input-bordered"
							/>
						</div>
					);
				})}

				<div className="mt-5">
					<button
						className="btn btn-primary"
						onClick={() => {
                            customToast({
                                message: "All Tokens Verified",
                                icon: "success",
                            });
							setVerified(true);
						}}
					>
						Verify All tokens
					</button>
				</div>

				{verifed && (
					<>
						<div className="divider"></div>
						<div>
							<button
								className="btn btn-success m-2"
								onClick={() => {
									customToast({
										message: "Land Merged Successfully",
										icon: "success",
									});
								}}
							>
								Merge Lands
								<FontAwesomeIcon
									size="1x"
									className="mx-2"
									icon={faArrowsSplitUpAndLeft}
								/>
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default EmployeeMergeLandCase;
