import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";

export async function POST(req) {
  const { email } = await req.json();
  if (!email) {
    return Response.json({ email: "Email is required" }, { status: 422 });
  }
  return await sendPasswordResetEmail(auth, email)
    .then(() =>
      Response.json(
        { message: "Password reset email sent successfully!" },
        { status: 200 }
      )
    )
    .catch((error) =>
      Response.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      )
    );
}
