import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "@contexts/ContextProvider";

export default function LoginLayout() {
    const {token} = useStateContext()

    if (token) {
        return <Navigate to="/"/>
    }
    
    return (
        <>
            <Outlet />
        </>
    )
}