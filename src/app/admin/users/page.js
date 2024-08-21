"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useBlocks } from "@/modules/blocks/hooks";
import { parseDate } from "@/modules/utils/convertors";
import { useUsers } from "@/modules/users/hooks";
import { useBlocksUsers } from "@/modules/blocks_users/hooks";

import AdminLayout from "../AdminLayout";

export default function UsersPage({}) {
	const { blocks } = useBlocks();
	const { users } = useUsers();
	const { blocksUsers } = useBlocksUsers();
	const router = useRouter();

	const navigateToUser = useCallback(
		(code) => router.push(`/admin/users/${code}`),
		[]
	);

	const getInfo = useCallback(
		(userId, blockId, blockIndex) => {
			const user = users.filter((u) => u.id === userId)[0];
			if (!user) return;
			const openingDate = parseDate(user.registered_at);
			const daysToAdd = blockIndex * 7 + 1; //first block starts next day after registration
			openingDate.setDate(openingDate.getDate() + daysToAdd);
			const today = new Date();
			let state = openingDate > today ? "closed" : "opened";
			const info = blocksUsers.filter(
				(item) => item.user_id === userId && item.block_id === blockId
			)[0];
			if (info) {
				if (info.force_open) state = "force_opened";
				if (info.finished) state = "finished";
			}
			const color =
				state === "closed"
					? "bg-red-100 text-red-800"
					: state === "opened" || state === "force_opened"
					? "bg-yellow-100 text-yellow-800"
					: "bg-green-100 text-green-800";
			const message =
				state === "closed"
					? `Uzavřený do ${openingDate.getDate()}.${
							openingDate.getMonth() + 1
					  }.`
					: state === "opened"
					? `Otevřený od ${openingDate.getDate()}.${
							openingDate.getMonth() + 1
					  }.`
					: state === "force_opened"
					? `Ručně otevřený`
					: `Dokončený ${parseDate(info.finished_at).getDate()}.${
							parseDate(info.finished_at).getMonth() + 1
					  }.`;

			return (
				<span className={`${color} text-sm me-2 px-2 py-1 rounded`}>
					{message} {info?.rating !== undefined && <b>{info.rating}/5</b>}
				</span>
			);
		},
		[blocksUsers, users]
	);
	return (
		<AdminLayout>
			<div className="md:flex flex-col md:flex-row w-full space-y-6 md:space-y-0 space-x-0 md:space-x-6">
				<div className="flex flex-col w-full text-gray-700 bg-white flex-shrink-0 border rounded-md">
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-x-auto">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3 w-36">
										ID uživatele
									</th>
									<th scope="col" className="px-6 py-3 w-56">
										Email
									</th>
									{blocks
										.sort((a, b) => a.position - b.position)
										.slice(1)
										.map((block, index) => (
											<th
												scope="col"
												className="px-6 py-3 w-56"
												key={`col-${index}`}
											>
												{block.name}
											</th>
										))}
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => (
									<tr
										className="hover:cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
										key={`row-${index}`}
										onClick={() => navigateToUser(user.code)}
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{user.code}
										</th>
										<td className="px-6 py-4">{user.email}</td>
										{blocks
											.sort((a, b) => a.position - b.position)
											.slice(1)
											.map((block, blockIndex) => (
												<td
													scope="row"
													className="px-6 py-3 w-56"
													key={`col-${index}-${blockIndex}`}
												>
													{getInfo(user.id, block.id, blockIndex)}
												</td>
											))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
