"use client";

import { getBlocks } from "../blocks/hooks";
import { getUser } from "../users/hooks";

const send = async (email, subject, html) => {
	return fetch("/api/send", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, subject, html }),
	});
};

export const sendConfirmRegistration = async (email) => {
	const message = await getBlocks().then(async (res) => {
		if (res.ok) {
			const json = await res.json();
			return json.blocks.find((b) => b.id === "REGISTER_EMAIL")?.email_content;
		}
	});
	const user = await getUser(email);
	if (message && user) {
		const html = message.replace("{{user_id}}", user.code);
		console.log(email, html);
		send(email, "Potvrzení registrace", html);
	}
};
