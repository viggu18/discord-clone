import { uploadBytes, ref } from "firebase/storage";
import { firebaseStorage } from ".";
import { IMAGE_ACCESS_TOKEN } from "@/components/constants";

async function uploadProfilePhoto(file: File) {
  const profileBucket = ref(
    firebaseStorage,
    `${crypto.randomUUID()}-${file.name}`
  );

  return await uploadBytes(profileBucket, file);
}

function getFileURL(name: string) {
  const defaultURL =
    "https://firebasestorage.googleapis.com/v0/b/discord-clone-cb757.appspot.com/o/";

  return `${defaultURL}${name}?alt=media&token=${IMAGE_ACCESS_TOKEN}`;
}
export { uploadProfilePhoto, getFileURL };
