import { Link } from "react-router-dom";
import axiosClient from "../axiosClient.js";
import {useRef} from "react";
import {useStateContext} from "../contexts/contextprovider.jsx";

export default function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        //console.log(payload);
        axiosClient.post('login', payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
            }
        });
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">
                    Login To Your Account
                </h1>
                <form onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder="email"/>
                    <input ref={passwordRef} type="password" placeholder="password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered? <Link to='/register'>Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}