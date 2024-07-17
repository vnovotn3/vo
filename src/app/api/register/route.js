import firebaseAuthController from "@/controllers/firebase-auth-controller";

export async function POST(req) {
  return await firebaseAuthController.registerUser(req);
}
