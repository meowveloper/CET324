import { Outlet } from "react-router";

export default function Root_Layout () {
    return (
        <div>
            <div className="text-white">
                Root Layout
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
