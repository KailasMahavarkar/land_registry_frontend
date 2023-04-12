import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { simpleChain } from "../../data/dummy.data";
import useDrizzle from "../../hooks/useDrizzle";

const SearchBarToken = () => {
	const [search, setSearch] = useState(false);
	const [token, setToken] = useState("");
    const drizzle = useDrizzle();

	const navigate = useNavigate();

	const dummyTokens = [
		"0x2dae3062a6028984535dace535dac538538662e69912fee1b08cf0a43fc9c",
		"0x4535dac538535dac535dac53853866853535dac53853866866c53853abefc",
	];

	const tokenSearchHandler = (e: any) => {
		e.preventDefault();

		// check if token is valid
		if (dummyTokens.includes(token)) {
			setSearch(true);
		} else {
			setSearch(false);
		}
	};

    // drizzle.getProperty();

	return (
		<div className="flex flex-col  min-h-[100vh] items-center justify-center prose max-w-none test ">
			<div className="flex child:m-2">
				<h1>Search Land by Token</h1>
				<FontAwesomeIcon icon={faSearch} size="2x" />
			</div>

			<input
				type="text"
				className="input input-bordered w-1/2 mt-5 rounded-full"
				placeholder="Enter Land Token"
				value={token}
				autoComplete="on"
				onChange={(e) => setToken(e.target.value)}
			/>

			<div className="flex w-full items-center justify-center ">
				{/* submit */}
				<div
					className="btn btn-primary px-[10px] mt-5 "
					onClick={tokenSearchHandler}
				>
					Submit
				</div>
			</div>

			{search && (
				<div className="">
					{simpleChain.chain.map((land, index) => {
						const { attributes, children } = land;

						return (
							<>
								<div
									key={index}
									className="flex card card-side bg-base-100 shadow-xl items-center justify-center "
								>
									<figure>
										<img
											src="https://placehold.jp/000000/ffffff/300x200.png?text=Property"
											alt="Movie"
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">
											Owned by: {attributes?.owner}
										</h2>
										<p>Token: {attributes?.token}</p>
										<div className="card-actions justify-end">
											<div className="btn-group">
												<button
													className="btn btn-active"
													onClick={() =>
														navigate(
															`/search/${token}`
														)
													}
												>
													View Details
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SearchBarToken;
