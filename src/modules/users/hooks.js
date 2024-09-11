"use client";

import { useCallback, useEffect, useState } from "react";

export const getUsers = () =>
	fetch("/api/users", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

export const getUser = (email) =>
	getUsers().then(async (res) => {
		if (res.ok) {
			const json = await res.json();
			return json.users.filter((u) => u.email === email)[0];
		}
		return undefined;
	});

export const saveUser = (id, data) =>
	fetch(`/api/users/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

export const deleteUser = (id) =>
	fetch(`/api/users/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

export const createUser = async (email) => {
	return fetch("/api/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	});
};

export const useUsers = () => {
	const [users, setUsers] = useState([]);

	const fetchUsers = useCallback(
		() =>
			getUsers().then(async (res) => {
				if (res.ok) {
					const json = await res.json();
					setUsers(json.users);
				}
			}),
		[]
	);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return { users, refetchUsers: fetchUsers };
};
