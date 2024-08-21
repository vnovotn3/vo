import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "@/config/firebase";

export async function POST(req) {
	const { currPassword, newPassword, email } = await req.json();
	if (!email || !currPassword || !newPassword) {
		return Response.json(
			{ error: "Email, old and new password are required!" },
			{ status: 422 }
		);
	}
	return await signInWithEmailAndPassword(auth, email, currPassword)
		.then(async (userCredential) => {
			return await updatePassword(userCredential.user, newPassword)
				.then(() => {
					return Response.json(
						{
							message: "Password changed",
						},
						{ status: 200 }
					);
				})
				.catch((error) => {
					const errorMessage =
						error.message || "An error occurred while changing password";
					return Response.json({ error: errorMessage }, { status: 500 });
				});
		})
		.catch((error) => {
			const errorMessage =
				error.message || "An error occurred while changing password";
			return Response.json({ error: errorMessage }, { status: 500 });
		});
}
