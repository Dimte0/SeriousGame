/* eslint-disable react/prop-types */
import { useState } from 'react'


export default function NbrPlayer({updateTab}) {
  //state
  const MaxPlayers = 4
  const [nbPlayer, setNbPlayer] = useState(1)

  //comportements
  
  const AddPlayer = ()=>{
    if(nbPlayer < MaxPlayers){ setNbPlayer(nbPlayer + 1);Modif(nbPlayer+1)}
  }

  const SubPlayer = ()=>{
    if(nbPlayer > 1){setNbPlayer(nbPlayer - 1); Modif(nbPlayer-1)}
  }

  const Modif = (i) =>{
    console.log(nbPlayer)
    updateTab(i)
  }

  //render
  return (
    <div className='NbrPlayer'>
        <p>Joueur {nbPlayer}/{MaxPlayers}</p>
        <button onClick={AddPlayer}> + </button>
        <button onClick={SubPlayer}> - </button>
    </div>
  )
}
