import "./divechart.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Divestockchart from "../../components/divestockchart/Divestockchart"
import { Navigate } from "react-router-dom"

 const Divechart = () => {
  return (
    <div className="Divechart">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Divestockchart/>
      </div>
    </div>
  )
}

export default Divechart;