
import { Button } from "@/src/client/components/ui/button";
import { NavLink } from "react-router";
import { use_auth } from "@/src/client/context/auth-context";


export default function Home_Page() {
    const auth_context = use_auth();
    return (
        <div className="container mx-auto p-8 text-center relative z-10">
            <div className="flex justify-center items-center gap-8 mb-8">
                Home Page
                { auth_context.email }
                <Button variant={'link'}>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </Button>
            </div>
        </div>
    );
}

