import LogoFrame from '../Composant/Global/LogoFrame'
import InitPlayerComp from '../Composant/InitPlayer/InitPlayerComp'
import "./Pages.css"
export default function InitPlayerTest() {
  return (
    <div className='InitPlayers'>
      
        <div id="tope">
            <LogoFrame/>    
        </div>
        <div id="middle">
            <InitPlayerComp/>
        </div>
    </div>
  )
}
