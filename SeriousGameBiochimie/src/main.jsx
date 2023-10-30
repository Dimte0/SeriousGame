import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './Pages/App.jsx'
import InitPlayer from './Pages/InitPlayer.jsx'
import Game from './Pages/game.jsx'
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/page1" element={<App/>} />
      <Route path="/page2" element={<InitPlayer/>} />
      <Route path="/page3" element={<Game/>} />
    </Routes>
  </BrowserRouter>
)