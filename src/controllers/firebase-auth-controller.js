import { cookies } from "next/headers";
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("../config/firebase");

const auth = getAuth();

class FirebaseAuthController {
  async registerUser(req) {
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

  async loginUser(req) {
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

  async resetPassword(req) {
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

  async logoutUser() {
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
}

module.exports = new FirebaseAuthController();
