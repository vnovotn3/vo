"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactHtmlParser from "react-html-parser";

import Button from "@/modules/ui/Button";
import { useBlocks } from "@/modules/blocks/hooks";
import Modal from "@/modules/ui/Modal";
import Icon from "@/modules/ui/Icon";
import Loading from "@/modules/ui/Loading";
import {
	formatDate,
	parseDate,
	transformHTML,
} from "@/modules/utils/convertors";
import { useAuth } from "@/modules/auth/hooks";
import {
	createBlockUser,
	saveBlockUser,
	useBlocksUsers,
} from "@/modules/blocks_users/hooks";

import UserLayout from "../UserLayout";
import TextArea from "@/modules/ui/TextArea";

export function Rating({ rating, setRating }) {
	const stars = useMemo(() => {
		const array = [];
		for (let i = 0; i < 5; i++) {
			array.push(
				<svg
					key={`star-${i}`}
					className={`w-4 h-4 me-1 ${
						rating > i ? "text-indigo-600" : "text-gray-300"
					} hover:opacity-50 hover:cursor-pointer`}
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 22 20"
					style={{ width: 20, height: 20 }}
					onClick={() => setRating(i + 1)}
				>
					<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
				</svg>
			);
		}
		return array;
	}, [rating]);

	return <div className="flex items-center pt-2">{stars}</div>;
}

export default function BlocksPage({}) {
	const [selectedBlock, setSelectedBlock] = useState(0);
	const [block, setBlock] = useState();
	const [loading, setLoading] = useState(false);
	const { blocks } = useBlocks();
	const user = useAuth();
	const { blocksUsers, refetchBlocksUsers } = useBlocksUsers();
	const [modalOpen, setModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalMessage, setModalMessage] = useState("");
	const [rating, setRating] = useState(3);
	const [note, setNote] = useState("");

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
							? "text-gray-400"
							: state === "finished"
							? "text-green-700"
							: "text-gray-700";
					const bgColor =
						state === "closed"
							? "bg-white"
							: state === "finished"
							? "bg-green-50"
							: "bg-gray-50";
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

					return {
						...block,
						openingDate: formatDate(openingDate),
						forceOpen: !!info?.force_open,
						state,
						color,
						bgColor,
						message,
						info,
					};
				}),
		[blocks, blocksUsers, user]
	);

	useEffect(() => {
		if (blocksData?.length && selectedBlock < blocksData.length) {
			setBlock(blocksData[selectedBlock]);
			setNote("");
			setRating(3);
		}
	}, [blocksData, selectedBlock]);

	const finish = useCallback(async () => {
		setLoading(true);
		let res;
		if (block.info) {
			res = await saveBlockUser(block.info.id, {
				block_id: block.info.block_id,
				user_id: block.info.user_id,
				force_open: block.info.force_open,
				finished: true,
				finished_at: formatDate(new Date()),
				note,
				rating,
			});
		} else {
			res = await createBlockUser({
				block_id: block.id,
				user_id: user.id,
				force_open: false,
				finished: true,
				finished_at: formatDate(new Date()),
				note,
				rating,
			});
		}
		setLoading(false);
		if (res.ok) {
			refetchBlocksUsers();
			setModalTitle("Hotovo");
			setModalMessage("Blok byl úspěšně dokončen");
			setModalOpen(true);
			window.scrollTo(0, 0);
		} else {
			setModalTitle("Chyba!");
			setModalMessage("Při ukládání nastala chyba. Prosím to zkuste znovu.");
			setModalOpen(true);
		}
		setNote("");
		setRating(3);
	}, [block, note, rating, user]);

	return (
		<UserLayout>
			<Loading loading={loading} />
			<Modal
				title={modalTitle}
				message={modalMessage}
				open={modalOpen}
				setOpen={setModalOpen}
			/>
			<div className="md:flex flex-col md:flex-row w-full space-y-6 md:space-y-0 space-x-0 md:space-x-6">
				<div className="flex flex-col w-full md:w-80 text-gray-700 bg-white flex-shrink-0 border rounded-md">
					<nav className="flex-grow md:block p-4">
						{blocksData?.map((block, index) => (
							<a
								key={`block-${index}`}
								onClick={
									block.state === "closed"
										? undefined
										: () => setSelectedBlock(index)
								}
								className={`block px-4 py-2 mt-2 flex flex-row gap-x-4 items-center ${
									block.color
								} ${
									selectedBlock === index ? "bg-gray-100" : block.bgColor
								} rounded-md hover:bg-gray-100`}
								href="#"
							>
								<Icon
									name={
										block.state === "closed"
											? "lock"
											: block.state === "finished"
											? "checked"
											: "bell"
									}
									style={{ width: "24px", height: "24px" }}
								/>
								<div>
									<p className="font-semibold text-sm">{block.name}</p>
									<p className="font-normal text-sm text-gray-500">
										{block.message}
									</p>
								</div>
							</a>
						))}
					</nav>
				</div>

				<div className="flex flex-col flex-1 bg-white flex-shrink-0 border rounded-md p-8">
					{block?.img && (
						<img
							src={block.img}
							alt="Banner"
							className="w-full h-96 object-cover opacity-70 mb-12"
						/>
					)}
					<div className="space-y-12">
						<div>
							<div className="pb-12">
								<h1 className="text-3xl font-semibold text-gray-900">
									{block?.name}
								</h1>
								<div className="text-gray-900 mt-6 prose prose-lg">
									{ReactHtmlParser(block?.content, {
										transform: transformHTML,
									})}
								</div>
							</div>
						</div>
					</div>

					{block?.state !== "finished" && (
						<div className="bg-blue-50 rounded-md p-8">
							<h1 className="text-xl font-semibold text-gray-900">
								{"Dokončit blok"}
							</h1>
							<div className="pt-4">
								<p className="text-gray-900 font-semibold">{"Hodnocení:"}</p>
								<Rating rating={rating} setRating={setRating} />
							</div>

							<div className="pt-5">
								<p className="text-gray-900 font-semibold pb-2">
									{"Poznámka:"}
								</p>
								<TextArea
									value={note}
									onChange={(e) => setNote(e.target.value)}
								/>
							</div>
							<div className="pt-5">
								<Button label="Dokončit" type="primary" onClick={finish} />
							</div>
						</div>
					)}

					{block?.state === "finished" && (
						<div className="bg-green-50 rounded-md p-8">
							<h1 className="text-xl font-semibold text-green-900 pb-4">
								{"Blok byl dokončen"}
							</h1>
							<dl className="divide-y divide-grey-500">
								<div className="px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
									<dt className="text-sm font-medium leading-6 text-gray-900">
										Datum dokončení
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
										{`${parseDate(block?.info.finished_at).getDate()}.${
											parseDate(block?.info.finished_at).getMonth() + 1
										}.`}
									</dd>
								</div>
								<div className="px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
									<dt className="text-sm font-medium leading-6 text-gray-900">
										Hodnocení
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
										<b>{`${block?.info.rating}/5`}</b>
									</dd>
								</div>
								<div className="px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
									<dt className="text-sm font-medium leading-6 text-gray-900">
										Poznámka
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
										{block?.info.note || "---"}
									</dd>
								</div>
							</dl>
						</div>
					)}
				</div>
			</div>
		</UserLayout>
	);
}
