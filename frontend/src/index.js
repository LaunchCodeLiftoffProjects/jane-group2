import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import App from './App';
import Login from './routes/login';
import BoxPage from './routes/boxPage';
import reportWebVitals from './reportWebVitals';
import Register from './routes/register';
import BoxDisplay from './routes/boxDisplay';
import TestAuth from "./routes/testAuthPage";
import Forgot from './routes/forgot'
import EditBoxDetails from './routes/editBoxDetails';
import SearchPageResults from './components/searchPageResults';

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<BoxPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="boxDisplay/:boxId" element={<BoxDisplay />} />
                <Route path="boxDisplay/:boxId/edit" element={<EditBoxDetails />} />
                <Route path="testAuth" element={<TestAuth />} />
                <Route path="forgot" element={<Forgot />} />
                <Route path="search/:searchTerm" element={<SearchPageResults />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
