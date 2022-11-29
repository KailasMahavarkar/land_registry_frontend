import { faArrowsSplitUpAndLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useState } from "react";
import { useEffectAsync } from "../../helper";
import customToast from "../../toast";

type colorType = "red" | "blue" | "green" | "yellow" | "violet";

const EmployeeSplitLandCase = () => {
	const [verifed, setVerified] = useState(false);

	const [activeColor, setActiveColor] = useState<colorType>("red");

	const [totalSplits, setTotalSplits] = useState(2);

	const palette = {
		red: 1,
		blue: 2,
		green: 3,
		yellow: 4,
		violet: 5,
	};

	const [landColorMap, setLandColorMap] = useState<number[][]>([]);

	useEffectAsync(() => {
		const tempRawMap = [];
		for (let i = 0; i < 5; i++) {
			const row = [];
			for (let j = 0; j < 20; j++) {
				row.push(0);
			}
			tempRawMap.push(row);
		}
		setLandColorMap(tempRawMap);
	}, []);

	const findColor = (col: number) => {
		if (col === 1) return "bg-red-500";
		if (col === 2) return "bg-blue-500";
		if (col === 3) return "bg-green-500";
		if (col === 4) return "bg-yellow-500";
		if (col === 5) return "bg-violet-500";
		return "bg-base-200";
	};

	return (
		<>
			<div>
				<h2>Split Land Case</h2>
				<div className="flex flex-col flex-end">
					<div className="form-control max-w-md">
						<label htmlFor="land-split">
							<span>Land Token</span>
						</label>
						<input
							type="text"
							className="input input-bordered"
							placeholder="Case ID"
						/>
						<div className="flex justify-end ">
							<button
								className="btn btn-primary btn-sm m-2"
								onClick={() => setVerified(true)}
							>
								Click to Verify
							</button>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="flex flex-col flex-end">
					<div className="form-control max-w-md">
						<label htmlFor="land-split">
							<span>Total land splits ?</span>
						</label>
						<input
							type="number"
							className="input input-bordered"
							placeholder="3"
							value={totalSplits}
							onChange={(e) =>
								setTotalSplits(parseInt(e.target.value))
							}
						/>
					</div>
				</div>
			</div>

			{/* <table>
				<tbody>
					{landColorMap.map((row, i) => (
						<tr key={i}>
							{row.map((col, j) => (
								<td
									key={j}
									className={`w-4 h-4 border border-black ${findColor(
										col
									)}`}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table> */}

			<div className="divider"></div>
			{verifed && (
				<>
					<div className="flex flex-col flex-end mt-5">
						<div className="flex child:m-2">
							<div>Select Color</div>
							{Object.keys(palette).map((color: any) => (
								<div
									className={`
                                w-10 h-10 bg-${color}-500
                                ${
									activeColor === color
										? "border-[5px] border-red-500"
										: ""
								}}
                                `}
									onClick={() => setActiveColor(color)}
								></div>
							))}
						</div>
						<div className="overflow-x-auto">
							{/* create 2x2 grid */}
							{/* color the grid when you move mouse */}
							{/* disable mouse function when tab is pressed */}
							<div className="flex items-center p-5 flex-col w-full border-2 ">
								{landColorMap.map((row, i) => (
									<div className="flex">
										{row.map((col, j) => (
											<div
												className={`w-10 h-10 border-[1px] border-black ${findColor(
													col
												)}`}
												onClick={() => {
													if (activeColor) {
														setLandColorMap(
															produce(
																landColorMap,
																(draft) => {
																	draft[i][
																		j
																	] =
																		palette[
																			activeColor
																		];
																}
															)
														);
													}
												}}
											></div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* map each color to input for property owner */}

					<div className="flex flex-col flex-end mt-5">
						<div className="overflow-x-auto">
							<table className="table w-full">
								<thead>
									<tr>
										<th></th>
										<th>Color</th>
										<th>Area Width</th>
										<th>Area Height</th>
										<th>Entity Name</th>
										<th>Entity Aadhar</th>
									</tr>
								</thead>
								<tbody>
									{Object.keys(palette).map(
										(color: any, index: number) => (
											<tr key={index}>
												<th>{index}</th>
												<td>
													<div
														className={`w-10 h-10 bg-${color}-500`}
													></div>
												</td>
												<td>
													<input
														type="number"
														className="input input-bordered w-full"
													/>
												</td>
												<td>
													<input
														type="number"
														className="input input-bordered w-full"
													/>
												</td>
												<td>
													<input
														type="text"
														className="input input-bordered w-full"
													/>
												</td>
												<td>
													<input
														type="text"
														className="input input-bordered w-full"
													/>
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>

					<div>
						<button className="btn btn-primary m-2"
                            onClick={() => {
                                customToast({
                                    message: "Many fields are empty",
                                    icon: "error",
                                })
                            }}
                        >
							Split Lands
							<FontAwesomeIcon
								size="1x"
								className="mx-2"
								icon={faArrowsSplitUpAndLeft}
							/>
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default EmployeeSplitLandCase;
