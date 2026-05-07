import { useRoutes } from "react-router-dom";
import routeConfig from "./Router";

function App() {
  const routes = useRoutes(routeConfig);
  return <div>{routes}</div>;
}

export default App;