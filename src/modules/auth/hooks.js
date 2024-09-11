"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { getUser } from "../users/hooks";

export const useAuth = (section) => {
	const [user, setUser] = useState();
	const router = useRouter();

	useEffect(() => {
		fetch("/api/auth/verify-token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async (res) => {
			if (res.ok) {
				const json = await res.json();
				const u = await getUser(json.user.email);
				setUser(u);
				if (section === "admin" && section !== u.role) router.push("/login");
			} else router.push("/login");
		});
	}, []);

	return user;
};

export const useLogOut = () => {
	const router = useRouter();

	return useCallback(() => {
		fetch("/api/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => router.push("/login"));
	}, []);
};
