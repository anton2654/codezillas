import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Error from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
import Fridge from "./pages/Fridge.jsx";
import Dishes from "./pages/dishes/Dishes.jsx";
import MainPage from "./pages/mainPage/mainPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fridge" element={<Fridge />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
