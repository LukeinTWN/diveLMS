import "./divetest.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Divebuysell from "../../components/divebuysell/Divebuysell"

 const Divetest = () => {
  return (
    <div className="Divetest">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Divebuysell/>
      </div>
    </div>
  )
}

export default Divetest;