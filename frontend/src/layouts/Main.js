import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Home from "./Home";
import UserLogin from "./Login";
import Registers from './Registers';
import Grid from "./Grid";
import AllProduct from "./AllProduct";
import NewsPage from "./NewsPage";
import ShoppingCart from './ShoppingCart'
const Main = () => (
    <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />}/>
            <Route path="/register" element={<Registers></Registers>}></Route>
            <Route path="/Login" element={<UserLogin/>} />
            <Route path="/listing-grid" element={<Grid/>}/>
            <Route path="/listAllProduct" element={<AllProduct/>}/>
            <Route path="/NewsPage" element={<NewsPage/>}/>
            <Route path="/cart" element={<ShoppingCart></ShoppingCart>}></Route>

        </Routes>
    </main>
)
export default Main;