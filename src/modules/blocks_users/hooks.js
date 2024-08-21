"use client";

import { useCallback, useEffect, useState } from "react";

const getBlocksUsers = () =>
	fetch("/api/blocks-users", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

export const saveBlockUser = (id, data) =>
	fetch(`/api/blocks-users/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

export const createBlockUser = async (data) => {
	return fetch("/api/blocks-users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

export const useBlocksUsers = () => {
	const [blocksUsers, setBlocksUsers] = useState([]);

	const fetchBlocksUsers = useCallback(
		() =>
			getBlocksUsers().then(async (res) => {
				if (res.ok) {
					const json = await res.json();
					setBlocksUsers(json.blocksUsers);
				}
			}),
		[]
	);

	useEffect(() => {
		fetchBlocksUsers();
	}, [fetchBlocksUsers]);

	return { blocksUsers, refetchBlocksUsers: fetchBlocksUsers };
};
