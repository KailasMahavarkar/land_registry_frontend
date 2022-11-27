import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const EmployeePropertyHistory = () => {
	const propertyHistoryArray = [
		{
			id: 1,
			sellingParty: "Radhe Sham",
			buyingParty: "Ramesh Goswami",
			state: "maharashtra",
			district: "mumbai",
			taluka: "mumbai",
			agentName: null,
			status: "verified",
			lastAction: "transfer",
			lastActionDate: "12/12/2020",
			action: "view",
		},

		{
			id: 2,
			sellingParty: "Ritik Shah",
			buyingParty: "Raju Shah",
			state: "maharashtra",
			district: "mumbai",
			taluka: "mumbai",
			agentName: "kartik mistry",
			status: "verified",
			lastAction: "transfer",
			lastActionDate: "12/11/2022",
			action: "view",
		},
		{
			id: 3,
			sellingParty: "Kailas Mahavarkar",
			buyingParty: "Mayur Sharma",
			state: "maharashtra",
			district: "mumbai",
			taluka: "mumbai",
			agentName: "ravi kumar",
			status: "verified",
			lastAction: "transfer",
			lastActionDate: "12/11/2022",
			action: "view",
		},
	];

	return (
		<div className="overflow-x-auto">
			<button className="btn ">
				Force Sync
				<FontAwesomeIcon className="mx-2" icon={faSync} />
			</button>
			<table className="table table-compact w-full">
				<thead>
					<tr>
						<th>SR</th>
						<th>Selling Party</th>
						<th>Buying Party</th>
						<th className="flex flex-col">
							<div>Agent Name </div>
							<div className="text-xs">(optional)</div>
						</th>
						<th>State</th>
						<th>District</th>
						<th>Taluka</th>
						<th>Last Action</th>
						<th>Last Action Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{propertyHistoryArray.map((item, index) => {
						return (
							<tr key={index}>
								<td>{item.id}</td>
								<td>{item.sellingParty}</td>
								<td>{item.buyingParty}</td>
								<td>{item.agentName}</td>
								<td>{item.state}</td>
								<td>{item.district}</td>
								<td>{item.taluka}</td>
								<td>{item.lastAction}</td>
								<td>{item.lastActionDate}</td>
								<td>
									<Link to={`/view/${item.id}`}>
										<button
											className="btn btn-primary"
											disabled={true}
										>
											{item.action}
										</button>
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default EmployeePropertyHistory;
