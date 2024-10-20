import lens from "../../assets/lens.png"
import arrow from "../../assets/downarrow.png"
import search from "../../assets/searchicon.jpg"
import olx from "../../assets/olxlogo.png"

import Login from "../login/login"
import { useState } from "react"
import Sellmodal from "../modal/Sellmodal"
import { useUser } from "../context/userContext"  // Import the UserContext



const Navbar = () => {
 
  const [loginPop,setLoginPop] = useState(false)
  const [sellModal,setSellModal] =useState(false)
  const {isLoggedIn,login,logout,user} =useUser()  


  const handleSellClick = () => {
    if (!isLoggedIn) {
      setLoginPop(true); 
    } else {
      setSellModal(true); 
    }
  };

  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      logout(); 
    } else {
      setLoginPop(true); 
    }
  };


  return (
    <>
      <div className="flex p-4 bg-slate-100  shadow-md"> 
        <img src={olx} className="w-13 h-9" />
        <div className="flex border-2 border-spacing-1 w-64 p-2 border-black ml-5 bg-white rounded-md">
            <img src={lens} alt="" className="w-6 h-5 mt-1"/>
            <input placeholder="Location" className="ml-3 outline-none" />
            <img src={arrow} className="w-8 h-7" />
        </div>
        <div className=" flex h-12 ml-4 border-2 border-black bg-white rounded-md">
          <input placeholder="Find Cars,Mobile phones and more" className="ml-3 w-[40rem] outline-none"/>
          <img src={search} alt="" className="w-12"/>
        </div>
        <div className="flex h-12 p-3 ml-10 cursor-pointer">
          <h1 className="font-bold">ENGLISH</h1>
          <img src={arrow} alt="" className="w-8 h-7"/>
        </div>
       
        <div  onClick={handleLoginLogoutClick} className="flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline">
        <h1 className="font-bold text-lg">
            {isLoggedIn ? 'Logout' : 'Login'}
          </h1>        
          </div>
        <div onClick={handleSellClick} className="w-28 flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500">
          <h1 className="font-bold text-lg ml-3">+ SELL</h1>
        </div>
    </div>
    {loginPop && !isLoggedIn && <Login setLoginPop={setLoginPop}/>}
    {sellModal && <Sellmodal setSellModal={setSellModal} userId={user?.uid || ''} />} {/* Pass setSellModal and userId */}

    </>

  )
}

export default Navbar