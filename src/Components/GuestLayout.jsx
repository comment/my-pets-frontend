import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider.jsx";

export default function GuestLayout(){
    const {token} = useStateContext();
    if(token){
        return <Navigate to='/' />
    }
    return(
        <div>
            <div>
            </div>
            <Outlet />
        </div>
    )
}