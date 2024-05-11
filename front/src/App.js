import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import ListNotification from "./pages/ListNotification";
import SendNotification from "./pages/SendNotification";

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="send" element={<SendNotification />} />
          <Route path="list" element={<ListNotification />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
