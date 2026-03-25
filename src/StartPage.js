import { useNavigate } from "react-router-dom"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import LogInForm from "./components/LogInPage"
import './components/componentsStyling/StartPage.css'

const StartPage = () =>{

    const navigate = useNavigate()

    useEffect(()=>{
        onAuthStateChanged(auth,()=>{
            if(auth.currentUser){
                navigate("/home");
            }else{
                navigate("/")
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return(
        <div className="startContainer">
            <div className="startWelcome">
                <h1>Build-A-Team</h1>
                <h2>Create an account or sign in to get started</h2>
            </div>
            <div className="startSignIn">
                <LogInForm/>
            </div>
        </div>
    )
}

export default StartPage