import type { RouteObject } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";

const routeConfig: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
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
