import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(req, { params }) {
	const data = await req.json();
	try {
		await updateDoc(doc(db, "blocks_users", params.id), data);
		return Response.json({}, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
