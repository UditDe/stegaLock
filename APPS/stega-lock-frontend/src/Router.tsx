import type { RouteObject } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";

const routeConfig: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Landing />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "*",
                element: (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h1>Error : 404 {"(Page not found)"}</h1>
                    </div>
                )
            }
        ],
    },
];

export default routeConfig;
