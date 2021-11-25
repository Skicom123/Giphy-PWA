import React from "react";
import Giphy from "./components/Giphy"
import Random from "./components/Random";
import "./App.css";
import {NavLink, Route, Routes, Navigate } from "react-router-dom";
import Categories from "./components/Categories";
import Detail from "./components/Detail"
import DetailCT from "./components/DetailCT"
import About from "./components/About";


const App = () => {
    return (
        <div className="app">
      <header className = "header">
        <div className = "containerhead">
          <h1>GIPHER</h1>
        </div>
      </header>
      <div className="content">
        <Routes>
        <Route path="/" element={<Navigate replace to="/giphy" />} />
          <Route path="/random" element={<Random />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/giphy" element={<Giphy />}></Route>
          <Route path="/giphy/:itemId" element={<Detail />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/categories/:categoriesName" element={<DetailCT />}></Route>

        </Routes>
        <footer>
          <div className="containernav">
            <NavLink to="/giphy" className="iconwrapper">
              Trending
            </NavLink>
            <NavLink to="/random" className="iconwrapper">
              Random Image
            </NavLink>
            <NavLink to="/categories" className="iconwrapper">
              Categories
            </NavLink>
            <NavLink to="/about" className="iconwrapper">
              About
            </NavLink>
          </div>
        </footer>
      </div>
    </div>
    );
};

export default App;