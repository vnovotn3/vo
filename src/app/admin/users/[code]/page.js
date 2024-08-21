"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useBlocks } from "@/modules/blocks/hooks";
import { formatDate, parseDate } from "@/modules/utils/convertors";
import { saveUser, useUsers } from "@/modules/users/hooks";
import {
	createBlockUser,
	saveBlockUser,
	useBlocksUsers,
} from "@/modules/blocks_users/hooks";
import Button from "@/modules/ui/Button";
import Select from "@/modules/ui/Select";
import Snack from "@/modules/ui/Snack";
import CheckBox from "@/modules/ui/CheckBox";

import AdminLayout from "../../AdminLayout";

const roles = ["user", "admin"];

export default function UserPage({ params }) {
	const [snackOpen, setSnackOpen] = useState(false);
	const { blocks } = useBlocks();
	const { users } = useUsers();
	const user = useMemo(
		() => users.filter((u) => u.code === params.code)[0],
		[users, params]
	);
	const { blocksUsers, refetchBlocksUsers } = useBlocksUsers();
	const router = useRouter();

	const navigateToUsers = useCallback(() => router.push("/admin/users"), []);

	const updateRole = useCallback(
		(role) => {
			saveUser(user.id, { role }), setSnackOpen(true);
		},
		[user]
	);

	const updateForceOpen = useCallback(
		(blockId, infoId, checked) => {
			if (infoId) {
				saveBlockUser(infoId, { force_open: checked }).then(refetchBlocksUsers);
			} else {
				createBlockUser({
					user_id: user.id,
					block_id: blockId,
					force_open: checked,
					finished: false,
				}).then(refetchBlocksUsers);
			}
			setSnackOpen(true);
		},
		[user]
	);

	const blocksData = useMemo(
		() =>
			user &&
			blocks
				.sort((a, b) => a.position - b.position)
				.slice(1)
				.map((block, blockIndex) => {
					const openingDate = parseDate(user.registered_at);
					const daysToAdd = blockIndex * 7 + 1; //first block starts next day after registration
					openingDate.setDate(openingDate.getDate() + daysToAdd);
					const today = new Date();
					let state = openingDate > today ? "closed" : "opened";
					const info = blocksUsers.filter(
						(item) => item.user_id === user.id && item.block_id === block.id
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
							? "Uzavřený"
							: state === "opened"
							? "Otevřený"
							: state === "force_opened"
							? "Ručně otevřený"
							: `Dokončený ${parseDate(info.finished_at).getDate()}.${
									parseDate(info.finished_at).getMonth() + 1
							  }.`;

					return {
						...block,
						openingDate: formatDate(openingDate),
						forceOpen: !!info?.force_open,
						state: { color, message },
						rating: info?.rating !== undefined ? <b>{info.rating}/5</b> : "---",
						note: info?.note ? info.note : "---",
						infoId: info?.id,
					};
				}),
		[blocks, blocksUsers, user]
	);

	if (!user) return null;
	return (
		<AdminLayout>
			<Snack
				open={snackOpen}
				setOpen={setSnackOpen}
				message="Změny byly uloženy"
			/>
			<div className="md:flex flex-col md:flex-row w-full space-y-6 md:space-y-0 space-x-0 md:space-x-6">
				<div className="flex flex-col w-full text-gray-700 bg-white flex-shrink-0 border rounded-md">
					<div className="relative shadow-md sm:rounded-lg p-8 pt-6">
						<div>
							<div className="px-4 sm:px-0">
								<Button
									label="Zpět na seznam"
									type="border"
									iconLeft="back"
									onClick={navigateToUsers}
								/>
								<h3 className="text-base font-semibold leading-7 text-gray-900 mt-6">
									Uživatel {params.code}
								</h3>
							</div>
							<div className="mt-4">
								<dl className="divide-y divide-gray-100">
									<div className="px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
										<dt className="text-sm font-medium leading-6 text-gray-900">
											Email
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											{user.email}
										</dd>
									</div>
									<div className="px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
										<dt className="text-sm font-medium leading-6 text-gray-900">
											Datum registrace
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											{user.registered_at}
										</dd>
									</div>
									<div className="px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
										<dt className="text-sm font-medium leading-6 text-gray-900">
											Práva
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											<Select
												options={roles}
												selected={user.role}
												onChange={updateRole}
											/>
										</dd>
									</div>
								</dl>
							</div>
						</div>

						<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3 w-36">
										Blok
									</th>
									<th scope="col" className="px-6 py-3 w-36">
										Otevření
									</th>
									<th scope="col" className="px-6 py-3 w-24">
										Otevřít
									</th>
									<th scope="col" className="px-6 py-3 w-56">
										Stav
									</th>
									<th scope="col" className="px-6 py-3 w-56">
										Hodnocení
									</th>
									<th scope="col" className="px-6 py-3 w-56">
										Poznámka
									</th>
								</tr>
							</thead>
							<tbody>
								{blocksData.map((block, index) => (
									<tr
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
										key={`row-${index}`}
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
										>
											{block.name}
										</th>
										<td scope="row" className="px-6 py-4">
											{block.openingDate}
										</td>
										<td scope="row" className="px-6 py-4">
											<CheckBox
												checked={block.forceOpen}
												onChange={(checked) =>
													updateForceOpen(block.id, block.infoId, checked)
												}
											/>
										</td>
										<td scope="row" className="px-6 py-4 whitespace-nowrap">
											<span
												className={`${block.state.color} text-sm me-2 px-2 py-1 rounded`}
											>
												{block.state.message}
											</span>
										</td>
										<td scope="row" className="px-6 py-4">
											{block.rating}
										</td>
										<td scope="row" className="px-6 py-4">
											{block.note}
										</td>
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
