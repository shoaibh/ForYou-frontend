import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthProvider";
import { Profile } from "./pages/profile";

function App() {
  return (
    <div className="bg-white m-auto max-w-[580px] w-full">
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
