"use client";

import { useCallback, useState } from "react";
import { BarChart } from "@mui/x-charts";

import Button from "@/modules/ui/Button";
import Input from "@/modules/ui/Input";
import Loading from "@/modules/ui/Loading";
import { useAuth, useLogOut } from "@/modules/auth/hooks";
import { useDailySummary } from "@/modules/daily_summary/hooks";

export default function FitnessPage({ params }) {
	const logOut = useLogOut();
	const [loading, setLoading] = useState(false);
	const { dailySummary } = useDailySummary();
	const user = useAuth();

	if (!user) return null;

	return (
		<>
			<Loading loading={loading} />
			<div className="md:flex flex-col md:flex-row w-full space-y-6 md:space-y-0 space-x-0 md:space-x-6">
				<div className="flex flex-col w-full text-gray-700 bg-white flex-shrink-0 border rounded-md">
					<div className="relative shadow-md sm:rounded-lg p-8 pt-6">
						<div>
							<h2 className="text-lg px-4 pt-4 sm:px-0 font-semibold leading-3 text-gray-900">
								Fitness metriky pro IS7_005 (TEST)
							</h2>

							<h3 className="text-base pt-5 font-medium leading-3 text-gray-900">
								Steps
							</h3>
							<BarChart
								xAxis={[
									{
										id: "barCategories",
										data: dailySummary
											.slice(-7)
											.map((keyValPair) => keyValPair[0]),
										scaleType: "band",
									},
								]}
								series={[
									{
										data: dailySummary
											.slice(-7)
											.map((keyValPair) => keyValPair[1].steps),
									},
								]}
								width={800}
								height={300}
							/>

							<h3 className="text-base pt-5 font-medium leading-3 text-gray-900">
								Active kilocalories
							</h3>
							<BarChart
								xAxis={[
									{
										id: "barCategories",
										data: dailySummary
											.slice(-7)
											.map((keyValPair) => keyValPair[0]),
										scaleType: "band",
									},
								]}
								series={[
									{
										data: dailySummary
											.slice(-7)
											.map((keyValPair) => keyValPair[1].active_kilocalories),
									},
								]}
								width={800}
								height={300}
							/>

							<h3 className="text-base pt-5 font-medium leading-3 text-gray-900">
								Active time in seconds
							</h3>
							<BarChart
								xAxis={[
									{
										id: "barCategories",
										data: dailySummary
											.slice(-7)
											.map((keyValPair) => keyValPair[0]),
										scaleType: "band",
									},
								]}
								series={[
									{
										data: dailySummary
											.slice(-7)
											.map(
												(keyValPair) => keyValPair[1].active_time_in_seconds
											),
									},
								]}
								width={800}
								height={300}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
