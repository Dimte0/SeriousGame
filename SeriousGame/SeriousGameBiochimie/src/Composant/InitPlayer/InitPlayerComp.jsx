import { useState } from 'react'
import NbrPlayer from './Part/NbrPlayer'
import TablePlayer from './Part/TablePlayer'
import SenderButton from './Part/SenderButton'

import "./InitPlayer.css"

export default function InitPlayerComp() {

  const [Nbplayer, setNbplayer] = useState(1)
  const [NamesPlayer, setNamesPlayer] = useState([])

  const UpdateTab = (i) =>{
    setNbplayer(i)
  }

  const UpdateNames = (i) =>{
    setNamesPlayer(i)
  }

  return (
    <div className='InitPlayerComp'>
        <div className='frame'>
            <NbrPlayer updateTab={UpdateTab}/>
        </div>
        <div className='frame'>
            <TablePlayer nbPlayer={Nbplayer} UpdateNames={UpdateNames}/>
            
        </div>
        <div className='frame'>
            <SenderButton NamesPlayer={NamesPlayer}/>
        </div>
        
    </div>
  )
}
