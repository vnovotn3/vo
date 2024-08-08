import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
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
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      return await sendEmailVerification(auth.currentUser)
        .then(() => {
          return Response.json(
            {
              message: "Verification email sent! User created successfully!",
            },
            { status: 201 }
          );
        })
        .catch((error) => {
          console.error(error);
          const errorMessage =
            error.message || "Error sending email verification";
          return Response.json({ error: errorMessage }, { status: 500 });
        });
    })
    .catch((error) => {
      const errorMessage =
        error.message || "An error occurred while registering user";
      return Response.json({ error: errorMessage }, { status: 500 });
    });
}
