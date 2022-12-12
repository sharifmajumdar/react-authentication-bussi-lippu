import './App.css';
import React from 'react';
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import NoMatch from './components/NoMatch/NoMatch';
import Services from './components/Services/Services';
import Blog from './components/Blog/Blog';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import Footer from './components/Footer/Footer';
import Order from './components/Order/Order';
import Data from "./data/Data";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect, createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const BusContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    setTickets(Data);
  }, [tickets]);
  return (
    <BusContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div className='container'>
          <Nav></Nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/shipment" element={<Shipment />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </BusContext.Provider>
  );
}

export default App;
