import { use_auth } from "@/src/client/context/auth-context";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function use_redirect_if_login() {
    const navigate = useNavigate();
    const auth_context = use_auth();
    useEffect(() => {
        console.log('check infinite loop');
        if(auth_context.email) navigate('/', { replace : true });
    }, [auth_context.email, navigate])
}
