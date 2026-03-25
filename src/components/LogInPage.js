/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./componentsStyling/SignIn-Up.css"

const LogInForm = () =>{
    const navigate = useNavigate();
    const errorDisplay = document.getElementById("errorField");
    const logInFunc = () =>{
        const userInfo = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        signInWithEmailAndPassword(auth, userInfo.username, userInfo.password)
        .catch(() => {
            errorDisplay.innerHTML = "Please enter a valid email in the email field above!"
        });
    }

    const testLogFunc = () =>{
        signInWithEmailAndPassword( auth, "aguestaccount@gmail.com", "atest123").catch(()=>{
            errorDisplay.innerHTML = "Test Account not available, please try again later!"
        })
    }

    const forgotPassword =() =>{
        
        sendPasswordResetEmail(auth, document.querySelector("#username").value).then(()=>{
            errorDisplay.innerHTML= "Reset email sent!";
        }).catch(()=>{
            errorDisplay.innerHTML = "Please enter a valid email in the email field above!"
        })

    }

    return(
        <div id="mainContainer">
            <div id="signContainer">
                <h1>Sign in</h1>
                <input type="text" id="username" placeholder="Enter email" required></input>
                <input type="password" id="password" placeholder="Enter pasword"></input>
                <span id="errorField"></span>
                <button type="button" id="logInBtn" onClick={()=>{logInFunc()}}>Log In</button>
                <button type="button" id="guestBtn" onClick={()=>{testLogFunc()}}>Use Test Account</button>
                <div id="signInLink">
                    <a onClick={()=>{forgotPassword()}}>Forgot Password?</a>
                </div>
                <hr></hr>
                <button type="button" id="createBtn" onClick={()=>{navigate("/sign-up")}}>Create an account</button>
            </div>
        </div>
    )
}

export default LogInForm