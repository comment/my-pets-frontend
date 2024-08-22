import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
        return <Navigate to='/login'/>
    }

    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
            .then(({}) => {
                setUser(null)
                setToken(null)
            })
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                //console.log(data);
                setUser(data)
            })
    }, [])

    return(
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}