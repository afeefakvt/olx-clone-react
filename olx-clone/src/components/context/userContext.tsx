import  {createContext,useContext,useState,ReactNode, useEffect} from "react";
import { onAuthStateChanged, User ,signOut} from "firebase/auth"; 
import { auth } from "../../firebase/setup"; 

interface UserContextType{
    isLoggedIn:boolean;
    isChanged:boolean;
    user: User | null; 
    login:()=> void;
    logout:()=> void;
    setIsChanged : React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser=()=>{
    const context =useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;

}


export const UserProvider = ({children}: {children:ReactNode })=>{
    const [user,setUser] = useState<User |null>(null);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [isChanged,setIsChanged] = useState(false);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            console.log("Auth state changed:", user);
            setUser(user);
            setIsLoggedIn(!!user)
        })
        return ()=>unsubscribe()
    },[])

    const login =()=> setIsLoggedIn(true)
    const logout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
            console.log("User signed out");
            setUser(null); 
            setIsLoggedIn(false); 
            console.log("isLoggedIn after logout:", false);
        } catch (error) {
            console.error("Logout error:", error); 
        }
    };

    return(
        <UserContext.Provider value={{isLoggedIn,user,login,logout,isChanged,setIsChanged}}>
            {children}
        </UserContext.Provider>
    )

}