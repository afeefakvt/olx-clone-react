import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/setup"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "../context/userContext";


const Sellmodal = ({ setSellModal, userId }: { setSellModal: any; userId: string }): JSX.Element => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { setIsChanged } = useUser()

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        let uploadedImageURL = "";
    console.log('ytrrr');
    
        if (imageFile) {
            // Upload image to Firebase Storage
            const storage = getStorage();
            const imageRef = ref(storage, `images/${imageFile.name}`);
            try {
                const snapshot = await uploadBytes(imageRef, imageFile);
                uploadedImageURL = await getDownloadURL(snapshot.ref); // Wait for image upload and get the URL
                console.log("Image uploaded successfully, URL:", uploadedImageURL);
                setIsChanged(true)
            } catch (error) {
                console.error("Error uploading image:", error);
                return; 
            }
        }
    
        try {
            // Add the product to Firestore with the uploaded image URL
            await addDoc(collection(db, "products"), {
                title,
                price,
                category,
                image: uploadedImageURL || "", // Use the uploaded image URL
                userId,
            });
            console.log("Product added successfully");
            
            setSellModal(false); // Close the modal after successful submission
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md w-[45rem] ">
            <h2 className="text-2xl mb-4">Add Product for Sale</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border"
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 mb-4 border"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 mb-4 border"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 mb-4 border"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => setSellModal(false)} 
                    className="bg-red-500 text-white p-2 rounded ml-2"
                >
                    Cancel
                </button>
            </form>
        </div>
    </div>
);
};

export default Sellmodal
