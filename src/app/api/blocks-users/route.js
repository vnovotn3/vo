import { db } from "@/config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

export async function GET(req) {
	const blocksUsers = await getDocs(collection(db, "blocks_users"));
	return Response.json(
		{
			blocksUsers: blocksUsers.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})),
		},
		{ status: 200 }
	);
}

export async function POST(req) {
	const data = await req.json();
	try {
		await addDoc(collection(db, "blocks_users"), data);
		return Response.json({}, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
