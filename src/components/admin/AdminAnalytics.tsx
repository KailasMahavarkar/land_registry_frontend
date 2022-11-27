import { faIndianRupee, faSatellite } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { analyticsData } from "../../data/analytics.data";

const AdminAnalytics = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full child:mt-5">
			<div>
				<h3>Land Analytics</h3>
				<div className="stats stats-vertical lg:stats-horizontal shadow">
					<div className="stat">
						<div className="stat-title">Land Registered</div>
						<div className="stat-value">31K</div>
						<div className="stat-desc">All time</div>
					</div>

					<div className="stat">
						<div className="stat-title">Land Pending (pileup)</div>
						<div className="stat-value">11/30</div>
						<div className="stat-desc">↗︎ 400 (22%)</div>
					</div>

					<div className="stat">
						<div className="stat-title">New Registers</div>
						<div className="stat-value">1,200</div>
						<div className="stat-desc">↘︎ 90 (14%)</div>
					</div>
				</div>
			</div>

			<div>
				<h3>State Analytics</h3>
				<div className="stats stats-vertical lg:stats-horizontal shadow">
					<div className="stat">
						<div className="stat-figure text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-8 h-8 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
						<div className="stat-title">States Covered</div>
						<div className="stat-value">3 / 30</div>
						<div className="stat-desc">All time </div>
					</div>

					<div className="stat">
						<div className="stat-figure text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-8 h-8 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
								></path>
							</svg>
						</div>
						<div className="stat-title">In-Progress</div>
						<div className="stat-value">11/30</div>
						<div className="stat-desc">
							↗︎ 5 states in last 2 years{" "}
						</div>
					</div>

					<div className="stat ">
						<div className="stat-figure text-secondary">
							<FontAwesomeIcon icon={faSatellite} />
						</div>
						<div className="stat-title">New Registers</div>
						<div className="stat-value">14</div>
						<div className="stat-desc"> All time</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminAnalytics;
