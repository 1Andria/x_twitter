import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";

export const OpenApple = async () => {
  const provider = new OAuthProvider("apple.com");
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Apple User:", user);
  } catch (error) {
    console.error("Apple Sign-In Error:", error);
  }
};
