import './App.css';
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import NoMatch from './components/NoMatch/NoMatch';
import Services from './components/Services/Services';
import Destination from './components/Destination/Destination';
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
import React, { useState, useEffect, createContext } from 'react';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

export const BusContext = createContext(); // Creating a contex API to share data among other components

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
            <Route path="/destination" element={<Destination />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route element={<Shipment />} path="/shipment" />
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
