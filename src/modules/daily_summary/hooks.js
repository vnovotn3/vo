"use client";

import { useCallback, useEffect, useState } from "react";

export const getDailySummary = () =>
	fetch("/api/wearable-db/daily-summary/IS7_005", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

export const useDailySummary = () => {
	const [dailySummary, setDailySummary] = useState([]);

	const fetchDailySummary = useCallback(
		() =>
			getDailySummary().then(async (res) => {
				if (res.ok) {
					const json = await res.json();
					setDailySummary(json.dailySummary);
				}
			}),
		[]
	);

	useEffect(() => {
		fetchDailySummary();
	}, [fetchDailySummary]);

	return { dailySummary, refetchBlocks: fetchDailySummary };
};
