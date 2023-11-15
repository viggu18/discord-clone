import { currentUser } from "@clerk/nextjs";
import { encryptedLocalStorage } from "./EncryptedStorage";

async function getUser() {
  const user = encryptedLocalStorage.getItem("user");
  if (user) return user;

  const clerkUser = await currentUser();

  if (clerkUser) {
    encryptedLocalStorage.setItem("user", clerkUser);
    return clerkUser;
  }
}

export default getUser;
