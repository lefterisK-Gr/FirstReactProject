import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import Sidebar from "./components/sidebar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ShopContextProvider>
          <Router>
            <Navbar></Navbar> {/* here add maybe sidebar and navbar*/}
            {/* MainContent */}
            <Sidebar></Sidebar>
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Router>
        </ShopContextProvider>
      </div>
    );
  }
}

export default App;
