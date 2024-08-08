import { cookies } from "next/headers";
import { adminAuth } from "@/config/firebase";

export async function POST(req) {
  const token = cookies().get("access_token");
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 403 });
  try {
    const decodedToken = await adminAuth.verifyIdToken(token.value);
    return Response.json({ user: decodedToken }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 403 });
  }
}
