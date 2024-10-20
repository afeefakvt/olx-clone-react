import  { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/setup"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

interface Ad {
    id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    uid: string;
}

const Myads = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const auth = getAuth();
    const { isChanged,setIsChanged} = useUser()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            if (currentUser) {
                try {
                    const q = query(collection(db, "products"), where("userId", "==", currentUser.uid));
                    const querySnapshot = await getDocs(q);
                    const userAds: Ad[] = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        title: doc.data().title,
                        category: doc.data().category,
                        price: doc.data().price,
                        image: doc.data().image,
                        uid: doc.data().userId,
                    }));
                    setAds(userAds);
                    setIsChanged(false)
                } catch (error) {
                    console.error("Error fetching user ads:", error);
                }
            }else{
                setAds([]);
            }
            setLoading(false);
        };

        if (currentUser) {
            fetchAds();
        }
    }, [currentUser,isChanged]);

    return (
        <div>
            <h2 className="text-2xl font-bold underline p-7">My Ads:</h2>
            {loading ? (
                <p className="ml-7">Loading ads...</p>
            ) : ads.length > 0 ? (
                <div className="grid grid-cols-4 gap-3 p-7">
                    {ads.map((ad) => (
                        <Link to="/details" state={{data:ad}} key={ad.id}>
                         <div  className="border p-4">
                            <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover" />
                            <p className="font-bold text-xl">${ad.price}</p>
                            <h3>{ad.title}</h3>
                            <p>{ad.category}</p>
                            
                        </div>
                        </Link>
                       
                    ))}
                </div>
            ) : (
                <p className="ml-7">No ads found for this user.</p>
            )}
        </div>
    );
};

export default Myads;
