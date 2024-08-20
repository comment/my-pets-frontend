import {Outlet} from "react-router-dom";

export default function GuestLayout(){
    return(
        <div>
            <div>
                Guest
            </div>
            <Outlet/>
        </div>
    )
}