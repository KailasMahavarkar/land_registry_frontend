import { faArrowsSplitUpAndLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useState } from "react";
import { useEffectAsync } from "../../helper";

type colorType = "red" | "blue" | "green" | "yellow" | "violet";

const EmployeeSplitLandCase = () => {
	const [verifed, setVerified] = useState(false);

	const [activeColor, setActiveColor] = useState<colorType>("red");

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
			<div className="divider"></div>
			{verifed && (
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
																draft[i][j] =
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
					<div>
						<button className="btn btn-primary m-2">
							Split Lands
							<FontAwesomeIcon
								size="1x"
                                className="mx-2"
								icon={faArrowsSplitUpAndLeft}
							/>
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default EmployeeSplitLandCase;
