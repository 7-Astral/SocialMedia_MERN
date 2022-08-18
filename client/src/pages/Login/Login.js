import "./login.css"
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export const Login = () => {
    const { user, isFetching, dispatch } = useContext(AuthContext);
    const email = useRef();
    const password = useRef();
    const clickHandler = (event) => {
        event.preventDefault();
        const email1 = email.current.value;
        const password1 = password.current.value;
        loginCall({ email: email1, password: password1 }, dispatch);
    }

    return (
        <div className="login" >
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Tekken Social</h3>
                    <span className="loginDesc">Connect With Friends!!!!</span>
                </div>
                <div className="loginRight" onSubmit={clickHandler}>
                    <form className="loginBox">
                        <input className="loginInput" type="email" required placeholder="Email" ref={email}></input>
                        <input className="loginInput" minLength="6" type="password" required placeholder="Password" ref={password} />
                        <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress size="30px" /> : "Log In"}</button>
                        <div className="lg">
                            <span className="loginForget">Forget Password ?</span>
                            <Link to="/register"><span className="loginwithRegister">Register</span></Link>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    )
}
