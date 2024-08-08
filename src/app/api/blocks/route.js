import { db } from "@/config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

export async function GET(req) {
  const blocks = await getDocs(collection(db, "blocks"));
  return Response.json(
    {
      blocks: blocks.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    },
    { status: 200 }
  );
}

export async function POST(req) {
  const data = await req.json();
  try {
    await addDoc(collection(db, "blocks"), {
      name: "Nový blok",
      img: "",
      content: "",
      email_content: "",
      position: data.position,
    });
    return Response.json({}, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
