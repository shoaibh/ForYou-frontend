import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthProvider";
import { Chat } from "./components/chat";
import { ProfileSongs } from "./pages/profileSongs";
import TanstackProvider from "./context/TanstackProvider";
import ToasterContext from "./context/ToasterContext";
import { Matches } from "./pages/matches";
import { Footer } from "./common-component/footer";

function App() {
  return (
    <div className="bg-white m-auto max-w-[580px] w-full h-screen relative">
      <TanstackProvider>
        <AuthProvider>
          <ToasterContext />
          <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/chat/:id" element={<Chat />} />
                <Route
                  path="/matches"
                  element={
                    <Footer>
                      <Matches />
                    </Footer>
                  }
                />
                <Route path="/profile-songs" element={<ProfileSongs />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </AuthProvider>
      </TanstackProvider>
    </div>
  );
}

export default App;
