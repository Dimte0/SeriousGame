import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './Pages/App.jsx'
import InitPlayer from './Pages/InitPlayer.jsx'
import InitPlayerTest from './Pages/InitPlayerTest.jsx'
import Game from './Pages/game.jsx'
import Game2 from './Composant/Game/Game.jsx';
import UnityComp from './Composant/Game/Part/UnityComp.jsx';
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/page1" element={<App/>} />
      <Route path="/page2" element={<InitPlayer/>} />
      <Route path="/page2/test" element={<InitPlayerTest/>} />
      <Route path="/page3" element={<Game/>} />
      <Route path="/page4" element={<UnityComp/>} />
      <Route path="/page4/test" element={<Game2/>} />
    </Routes>
  </BrowserRouter>
)