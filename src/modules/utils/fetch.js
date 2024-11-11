export const fetchApi = async (url, method = "GET", body = {}) =>
	await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		...(method === "POST" && { body: JSON.stringify(body) }),
	}).then(async (res) => await res.json());
