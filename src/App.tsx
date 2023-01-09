import React from 'react';
import { Route, Routes} from "react-router-dom";
import MainLayout from "./page/MainLayout";
import {Card, Pizza} from "./page";
import Home from "./page/Home";
import NotFound from "./page/NotFound";

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home />} />
          <Route path="pizza/:id" element={<Pizza/>} />
          <Route path="card" element={<Card/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
