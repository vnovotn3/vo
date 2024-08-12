import { db } from "@/config/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function PUT(req, { params }) {
	const data = await req.json();
	try {
		await updateDoc(doc(db, "users", params.id), data);
		return Response.json({}, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(req, { params }) {
	try {
		await deleteDoc(doc(db, "users", params.id));
		return Response.json({}, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
