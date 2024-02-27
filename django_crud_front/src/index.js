import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter, Route, BrowserRouter as Router,
    RouterProvider, Routes
} from "react-router-dom";
import Layout from "./components/Layout";
import './App.scss';
import AllArticles from "./pages/AllArticles";
import AddArticle from "./pages/AddArticle";
import SingleArticle from "./pages/SingleArticle";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<Layout />} >
                  <Route path="/" element={<AllArticles />} />
                  <Route path="/new" element={<AddArticle />} />
                  <Route path="/update" element={<AddArticle />} />
                  <Route path="/single/article/:id" element={<SingleArticle />} />
              </Route>
          </Routes>
      </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
