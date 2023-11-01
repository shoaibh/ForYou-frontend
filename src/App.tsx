import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthProvider";
import { Chat } from "./components/Chat";

function App() {
  return (
    <div className="bg-slate-50">
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:id" element={<Chat />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
