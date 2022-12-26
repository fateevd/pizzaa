import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./page/MainLayout";
import {Card} from "./page";
import Home from "./page/Home";
import NotFound from "./page/NotFound";

function App() {
  console.clear();
  return (
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home />} />
          <Route path="card" element={<Card/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
