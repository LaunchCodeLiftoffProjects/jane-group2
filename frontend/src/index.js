import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Login from './routes/login';
import BoxList from './routes/boxList';
import reportWebVitals from './reportWebVitals';
import Register from './routes/register';
<<<<<<< HEAD
import BoxDisplay from './routes/boxDisplay';
=======
import TestAuth from "./routes/testAuthPage";
>>>>>>> 2a21dfbdd43a93a48b01a17598acdf5f7c9b8c0b

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<BoxList />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
<<<<<<< HEAD
        <Route path="boxDisplay" element={<BoxDisplay />} />
=======
        <Route path="testAuth" element={<TestAuth />} />
>>>>>>> 2a21dfbdd43a93a48b01a17598acdf5f7c9b8c0b
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
