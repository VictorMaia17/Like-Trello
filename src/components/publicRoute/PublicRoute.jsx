import { Navigate, Outlet} from "react-router";
import { getAuthToken } from "../../services/storage/auth";

export default function PublicRoute(){

    const token = getAuthToken();

    if(token){
        return <Navigate to="dashboard" replace/>
    }

    return <Outlet/>
}