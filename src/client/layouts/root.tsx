import { NavLink, Outlet } from "react-router";
import {
    Card,
    CardDescription,
} from "@/src/client/components/ui/card"

export default function Root_Layout() {
    return (
        <div>
            <div className="text-white">
                <Card className="rounded-none px-5">
                    <CardDescription>
                        <NavLink to="/" end>
                            Home
                        </NavLink>
                    </CardDescription>
                </Card>
            </div>
            <div className="px-5 py-20">
                <Outlet />
            </div>
        </div>
    );
}
