import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffectAsync } from "../../helper";
import customToast from "../../toast";
import { singleLandAttributeType } from "../../types/type";

const EmployeePropertyHistory = () => {

    const [history, setHistory] = useState([]);

	useEffectAsync(async () => {
		// get property history
		const  result = await axios.get("/employee/property-history");

        if (result){
            setHistory(result.data.data);
        }

	}, []);

	return (
		<div className="overflow-x-auto">
			<button className="btn "
                onClick={async () => {

                    customToast({
                        icon: "warning",
                        message: "force syncing changes",
                    })
                }}
            >
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
					{history.map((item: any, index: number) => {
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
