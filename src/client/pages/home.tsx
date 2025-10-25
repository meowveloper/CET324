
import { Button } from "@/src/client/components/ui/button";
import { NavLink } from "react-router";


export default function Home_Page() {
    return (
        <div className="container mx-auto p-8 text-center relative z-10">
            <div className="flex justify-center items-center gap-8 mb-8">
                Home Page
                <Button variant={'link'}>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </Button>
            </div>
        </div>
    );
}

