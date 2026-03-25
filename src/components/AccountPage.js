import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"

const AccountPage =()=>{
    return(
        <div>
            <div>
                <Navbar/>
            </div>
                <p>Welcome to your account page!</p>
                <Link to="/Home"><button type="button">Go Home</button></Link>
        </div>

    )
}

export default AccountPage