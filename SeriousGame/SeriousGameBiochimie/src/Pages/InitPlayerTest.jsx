import React from 'react'
import NameGame from '../Composant/NameGame'
import InitPlayerComp from '../Composant/InitPlayer/InitPlayerComp'
import "./Pages.css"
export default function InitPlayerTest() {
  return (
    <div className='InitPlayers'>
        <div id="top">
            <span id="img_game">
                <NameGame/>
            </span>
        </div>
        <div id="middle">
            <InitPlayerComp/>
        </div>
    </div>
  )
}
