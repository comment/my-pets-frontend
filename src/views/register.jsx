import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axiosClient.js";
import { useStateContext } from "../contexts/contextprovider.jsx";

export default function Register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        console.log(payload);
        axiosClient.post('register', payload).then(({data}) => {
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
                    Create A New Account
                </h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="name" placeholder="name"/>
                    <input ref={emailRef} type="email" placeholder="email"/>
                    <input ref={passwordRef} type="password" placeholder="password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Already Have An Account? <Link to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}