/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from 'react'
import GameComponent from '../Composant/Game/GameComponant'
import UnityComp from '../Composant/Game/Part/UnityComp'
import { useLocation } from 'react-router-dom'
import valol from '../Composant/Game/istockphoto-1023726474-612x612.jpg'
import "./Pages.css"

export default function game() {

  //State

  const location = useLocation()

  //const [Player, setPlayer] = useState()
  const [IsMouvement, setIsMouvement] = useState(false)
  const [IsPrint, setIsPrint] = useState(false)
  const UnityRef = useRef()
  //Functions

  const UpdateMouv = (x, idrep) =>{
    //setPlayer(x)
    setIsMouvement(!IsMouvement)
    UnityRef.current.MovePlayer(x, idrep)
  }

  const PrintImage = () =>{
    setIsPrint(true)
  }

  const PrintegamI = () =>{
    setIsPrint(false)
  }

  //render
  return (
    <div className='Game'>
        <div id="imagePrint" style={{ visibility : IsPrint ? 'visible' : 'hidden'}}>
          {IsPrint &&
            <img onClick={PrintegamI} src={valol}></img>
          }
        </div>
        <div>
            <UnityComp ref={UnityRef}/>
        </div>
        <div>
            <GameComponent ListPlayers={location.state.ListData} UpdateMouv={UpdateMouv} PrintImage={PrintImage}/>
        </div>
    </div>
  )
}
