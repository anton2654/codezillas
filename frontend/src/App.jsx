import "./styles/App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Error from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
import Fridge from "./pages/fridge/Fridge.jsx";
import Dishes from "./pages/dishes/Dishes.jsx";
import MainPage from "./pages/mainPage/mainPage.jsx";
import Create from "./pages/create/create.jsx";
import Generator from './pages/generator/Generator.jsx'

export const SearchContext = React.createContext();


function App() {
  const [searchValue, setSearchValue] = useState("");


  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App;
