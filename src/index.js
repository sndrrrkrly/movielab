import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/index";

import { MainLayout } from "./components/layouts/MainLayout";
import { Movie } from "./modules/movie/Movie";

import "./styles/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"))
     .render(
          <ApolloProvider client = {client}>
               <StrictMode>
                    <MainLayout>
                         <BrowserRouter>
                              <Routes>
                                   <Route path = "/" element = {<App />} />
                                   <Route path = "/r/:id/:slug" element = {<Movie />} />
                              </Routes>
                         </BrowserRouter>
                    </MainLayout>
               </StrictMode>
          </ApolloProvider>
     );