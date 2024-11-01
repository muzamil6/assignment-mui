import { getFirestore, collection, addDoc } from "firebase/firestore";

export const saveImageToFirestore = async (base64String) => {
  const firestore = getFirestore();
  try {
    const docRef = await addDoc(collection(firestore, "images"), {
      image: base64String,
      createdAt: new Date(),
    });
    console.log("Image saved with ID:", docRef.id);
  } catch (error) {
    console.error("Error saving image:", error);
  }
};
