import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './Pages/App.jsx'
import InitPlayer from './Pages/InitPlayer.jsx'
import Game from './Pages/Game.jsx'
import InitDataComp from './Composant/InitData/InitDataComp.jsx';
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/page0" element={<InitDataComp/>} />
      <Route path="/page1" element={<App/>} />
      <Route path="/page2" element={<InitPlayer/>} />
      <Route path="/page3" element={<Game/>} />
    </Routes>
  </BrowserRouter>
)