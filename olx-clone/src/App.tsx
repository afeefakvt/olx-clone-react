import { Route, Routes } from "react-router-dom"
import Main from "./components/Main/Main"
import Details from "./components/Details/Details"


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/details" element={<Details/>}/>
    </Routes>
    </>

  )
}

export default App
