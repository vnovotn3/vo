import mysql from "mysql2/promise";
import { dbConfig } from "@/config/wearableDB";

export async function GET(req, { params }) {
	try {
		const connection = await mysql.createConnection(dbConfig);
		const [rows] = await connection.query(
			`
			SELECT 
			  dl.device_id,
			  dl.calendar_date,
			  dl.steps,
			  dl.active_kilocalories,
			  dl.active_time_in_seconds,
			  dl.average_heart_rate_in_beats_per_minute,
			  dl.bmr_kilocalories,
			  device.research_number
			FROM daily_summary dl
			INNER JOIN device
			ON dl.device_id = device.device_id
			WHERE device.research_number = ?
			`,
			[params.userCode] // Pass the parameter securely
		);
		//reduce same days by highest steps
		let dailySummaryByDateMap = new Map();
		rows.forEach((row) => {
			const record = dailySummaryByDateMap.get(row.calendar_date);
			if (record === undefined || record?.steps < row.steps) {
				dailySummaryByDateMap.set(row.calendar_date, row);
			}
		});
		//sorted map by dates
		dailySummaryByDateMap = [...dailySummaryByDateMap].sort((a, b) => {
			return new Date(a[0]) - new Date(b[0]);
		});
		await connection.end();
		return Response.json(
			{ dailySummary: dailySummaryByDateMap },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Database connection error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
}
