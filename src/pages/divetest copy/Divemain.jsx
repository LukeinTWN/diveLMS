import "./divemain.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Divecourse from "../../components/divecourse/Divecourse"
import { Navigate } from "react-router-dom"

 const Divemain = () => {
  return (
    <div className="Divemain">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Divecourse/>
      </div>
    </div>
  )
}

export default Divemain;