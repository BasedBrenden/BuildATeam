import { useNavigate} from "react-router-dom"
import './componentsStyling/Navbar.css'
import { auth } from '../firebase'
import { signOut } from "firebase/auth";



const Navbar = () =>{
    const navigate = useNavigate();

    const signOutClick = () =>{

        signOut(auth).catch((error)=>{console.log(error)})
        navigate("/")
    }

    const toggleDropdown = () => {

        document.querySelector(".dropdownContent").classList.toggle("show");

    }

    window.onclick = function(event) {
        if (!event.target.matches('.material-symbols-outlined')) {
            if(document.querySelector(".dropdownContent") && document.querySelector(".dropdownContent").classList.contains("show"))
            document.querySelector(".dropdownContent").classList.toggle("show");
        }
      } 

    return(
        <div className="navbarDiv"> 
            <p onClick={()=>{navigate("/Home")}}>Build-a-Team!</p>
                <div className="logInDiv">
                    <div className="dropdown">
                        <button onClick={()=>{toggleDropdown()}} className="accntBtn"><span className="material-symbols-outlined"> account_circle </span></button>
                            <div id="myDropdown" className="dropdownContent">
                                <button type="button" className="dropdownHolder" onClick={()=>{navigate("/")}} >Home</button>
                                <button type="button" className="dropdownSignout" onClick={()=>{ signOutClick()}}>Sign Out</button>
                                <button type="button" className="dropdownTrainerCard" onClick={()=>{navigate("/trainer-card/Team1")}} >Trainer Card</button>
                            </div>
                    </div> 
                </div>
        </div>
    )
}

export default Navbar