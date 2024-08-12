import { db } from "@/config/firebase";
import { formatDate } from "@/modules/utils/convertors";
import { generateRandomCode } from "@/modules/utils/generators";
import { getDocs, collection, addDoc } from "firebase/firestore";

export async function GET(req) {
	const users = await getDocs(collection(db, "users"));
	return Response.json(
		{
			users: users.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
		},
		{ status: 200 }
	);
}

export async function POST(req) {
	const data = await req.json();
	const email = data.email;
	let code = generateRandomCode();
	while (true) {
		const users = await getDocs(collection(db, "users"));
		if (users.docs.filter((user) => user.code === code).length === 0) break;
		code = generateRandomCode();
	}
	try {
		await addDoc(collection(db, "users"), {
			email,
			code,
			registered_at: formatDate(new Date()),
			role: "user",
		});
		return Response.json({}, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
