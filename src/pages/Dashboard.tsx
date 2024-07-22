
import { Outlet } from "react-router-dom"
import Container from "../components/Container"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import RightNavbar from "../components/rightNavbar"


function Dashboard() {
  return (
    <>
    <Container>
        <Navbar/>
      <div className="flex ">


        <div className="left h-full bg-base-200">
        <RightNavbar/>
        </div>

          <main>
            <Outlet/>
          </main>


</div>
        <Footer/>
    </Container>
    </>
  )
}

export default Dashboard