import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ChatingPage from "./page/ChatingPage";
import LoginPage from "./page/LoginPage";
import LandingPage from "./page/LandingPage";
import Header from "./component/Header";
import { useState } from "react";

function App() {
  const [isUserName, setIsUserName] = useState("");
  const [isUserId, setIsUserId] = useState(0);
  return (
    <div className="App">
      <div className="background">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  isUserName={isUserName}
                  isUserId={isUserId}
                  setIsUserName={setIsUserName}
                  setIsUserId={setIsUserId}
                />
              }
            />
            <Route
              path="/chatting"
              element={
                <ChatingPage
                  isUserName={isUserName}
                  isUserId={isUserId}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
