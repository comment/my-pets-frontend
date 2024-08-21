import { Link } from "react-router-dom";

export default function Login(){

    const Submit = (ev) => {
        ev.preventDefault();
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">
                    Login To Your Account
                </h1>
                <form onSubmit={Submit}>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered? <Link to='/register'>Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}