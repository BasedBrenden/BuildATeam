import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';

import StartPage from './StartPage';
import HomePage from './components/HomePage';
import SignUpForm from './components/SignUpPage';
import LogInForm from './components/LogInPage';

import reportWebVitals from './reportWebVitals';
import TrainerCard from './components/TrainerCard';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element={<StartPage/>}/>
      <Route path = "*" element={<StartPage/>}/>
      <Route path ="/Home" element={<HomePage/>}/>
      <Route path ="/sign-up" element={<SignUpForm/>}/>
      <Route path ="/log-in" element={<LogInForm/>}/>
      <Route path ="/trainer-card/:teamParam" element={<TrainerCard/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
