import { isSameDate, parseDate } from "@/modules/utils/convertors";
import { fetchApi } from "@/modules/utils/fetch";

export async function GET(req) {
	const users = (
		await fetchApi(new URL("/api/users", req.nextUrl.origin).toString())
	).users;

	const blocks = (
		await fetchApi(new URL("/api/blocks", req.nextUrl.origin))
	).blocks
		.sort((a, b) => a.position - b.position)
		.slice(1);

	const blocksUsers = (
		await fetchApi(new URL("/api/blocks-users", req.nextUrl.origin))
	).blocksUsers;

	const openBlocksToday = users
		.map((user) => {
			let openingDate = parseDate(user.registered_at);
			//first block starts next day after registration
			openingDate.setDate(openingDate.getDate() + 1);

			for (let i = 0; i < blocks.length; i++) {
				const today = new Date();
				openingDate.setDate(openingDate.getDate() + 7 * i);
				if (isSameDate(today, openingDate)) {
					//today this block opens -> check if not already finished or forced opened
					const info = blocksUsers.filter(
						(item) => item.user_id === user.id && item.block_id === blocks[i].id
					)[0];
					if (info && (info.force_open || info.finished)) return null;
					return {
						user,
						block: blocks[i],
					};
				}
			}
			return null;
		})
		.filter((b) => !!b);

	openBlocksToday.forEach(async (data) => {
		const html = data.block.email_content.replace(
			"{{user_id}}",
			data.user.code
		);
		await fetchApi(new URL("/api/send", req.nextUrl.origin), "POST", {
			email: data.user.email,
			subject: `Otevřena nová metoda: ${data.block.name}`,
			html,
		});
	});

	return Response.json(
		{
			openBlocksToday: openBlocksToday.map((data) => ({
				user: data.user.email,
				block: data.block.name,
			})),
		},
		{ status: 200 }
	);
}
