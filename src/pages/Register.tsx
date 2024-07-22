// import { Link } from "react-router-dom"
import Container from "../components/Container"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Form from "../features/users/Form"
function Register() {
  return (
    <>
        <Container className="flex flex-col justify-around bg-base-200">
    <Navbar/>

<Form/>
    
    <Footer/>
    </Container>
    </>
  )
}

export default Register