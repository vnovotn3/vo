import { cookies } from "next/headers";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

export async function POST(req) {
	const { email, password } = await req.json();
	if (!email || !password) {
		return Response.json(
			{
				email: "Email is required",
				password: "Password is required",
			},
			{ status: 422 }
		);
	}
	return await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const idToken = userCredential._tokenResponse.idToken;
			if (idToken) {
				cookies().set({
					name: "access_token",
					value: idToken,
					httpOnly: true,
				});
				return Response.json(
					{
						message: "User logged in successfully",
						userCredential,
					},
					{ status: 200 }
				);
			} else
				return Response.json(
					{ error: "Internal Server Error" },
					{ status: 500 }
				);
		})
		.catch((error) => {
			const errorMessage =
				error.message || "An error occurred while logging in";
			return Response.json({ error: errorMessage }, { status: 500 });
		});
}
