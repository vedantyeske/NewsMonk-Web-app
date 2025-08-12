import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
        
        <Navbar/>
        

        <Routes>
        <Route path="/" element={<News key='general' pageSize={6} country="us" category="general" />} />
        <Route path="/Entertainment" element={<News key='Entertainment' pageSize={6} country="us" category="Entertainment" />} />
            <Route path="/Health" element={<News key='Health' pageSize={6} country="us" category="Health" />} />
            <Route path="/Science" element={<News key='Science' pageSize={6} country="us" category="Science" />} />
            <Route path="/Business" element={<News key='Business' pageSize={6} country="us" category="Business" />} />
        </Routes>
        
      </div>
      </Router>
      
    )
  }
}
