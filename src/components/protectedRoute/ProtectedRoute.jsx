import { useLocation, Navigate, Outlet } from "react-router";
import { getAuthToken } from "../../services/storage/auth";


export default function ProtectedRoute(){
    
    const location = useLocation();
    
    const token = getAuthToken();
    
    if(!token){
        return(
            <Navigate 
                to="/login"
                replace
                state={{ from:location }}
            />    
        )
    }

    return <Outlet/>

}