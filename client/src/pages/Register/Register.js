import "./register.css"
import { useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
export const Register = () => {
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();
    const clickHandler = async(event) => {
        event.preventDefault();
        if (password.current.value !== passwordAgain.current.value) {
            password.current.setCustomValidity("Password is Not Matched!");
            console.log("Done HERE")
        }else {
            const user = {
              username: username.current.value,
              email: email.current.value,
              password: password.current.value,
            };
            try {
              await axios.post("http://localhost:8800/api/auth/register", user);
              history("/login");
            } catch (err) {
              console.log(err);
            }
          }

    }
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Tekken Social</h3>
                    <span className="registerDesc">Connect With Friends!!!!</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={clickHandler}>
                        <input className="registerInput" ref={username} required placeholder="Username"></input>
                        <input className="registerInput" ref={email} type="email" required placeholder="Email"></input>
                        <input className="registerInput" ref={password} minLength="6" required placeholder="Password" />
                        <input className="registerInput" ref={passwordAgain} minLength="6"required  placeholder="Confirm Password" />
                        <button className="registerButton" type="submit">Sign up</button>
                        <div className="lg">
                            <span className="registerForget">Already Account?</span>
                           <Link to="/login"> <span className="loginwithRegister">Log In</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
