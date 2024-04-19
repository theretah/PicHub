import { useRoutes } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "./context/AuthProvider";
import Index from "./pages/Index";

function App() {
  const router = useRoutes(Routes);
  return <AuthProvider>{router}</AuthProvider>;
}

export default App;
