import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
	const { email, subject, html } = await req.json();
	try {
		const { data, error } = await resend.emails.send({
			from: "Indomitable.cz <info@indomitable.cz>",
			to: [email],
			subject,
			html,
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
