/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/globals.css"
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home_Page from "@/src/client/pages/home";
import Login_Page from "@/src/client/pages/login";

const router =  createBrowserRouter([
    {
        path: '/',
        element: <Home_Page />
    },
    {
        path: '/login',
        element: <Login_Page />
    }
]);

const elem = document.getElementById("root")!;
const app = (
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

if (import.meta.hot) {
    // With hot module reloading, `import.meta.hot.data` is persisted.
    const root = (import.meta.hot.data.root ??= createRoot(elem));
    root.render(app);
} else {
    // The hot module reloading API is not available in production.
    createRoot(elem).render(app);
}
