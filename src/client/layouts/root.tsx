import { NavLink, Outlet } from "react-router";

export default function Root_Layout () {
    return (
        <div>
            <div className="text-white">
                <NavLink to="/" end>
                    Root Layout
                </NavLink>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
