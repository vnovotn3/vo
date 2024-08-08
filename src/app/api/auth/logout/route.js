import { cookies } from "next/headers";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

export async function POST(req) {
  return await signOut(auth)
    .then(() => {
      cookies().delete("access_token");
      return Response.json(
        { message: "User logged out successfully" },
        { status: 200 }
      );
    })
    .catch((error) =>
      Response.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      )
    );
}
