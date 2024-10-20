import {  useEffect, useState } from "react"
import Menubar from "../Menubar/Menubar"
import Navbar from "../navbar/navbar"
import Home from "../home/Home"
import Footer from "../Footer/Footer"
import { UserProvider } from "../context/userContext"
import Myads from "../Myads/Myads"


const Main = () => {

  const [prod,setProd] = useState([])
 

  const getProducts = ()=>{
    fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(json=>setProd(json))
  }
  useEffect(()=>{ 
    getProducts()


  },[])


  return (
    <UserProvider>
      <div>
        <Navbar/>
        <Menubar/>
        <Home products={prod}/>
        <Myads/>
        <Footer/>
    </div>
    </UserProvider>
    
  )
}

export default Main



