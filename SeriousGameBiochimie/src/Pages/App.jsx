import React from 'react'
import { Link } from 'react-router-dom';
//import '../index.css'

export default function App(){

    return (
      <div className="firstapp">
        <div id="main">
          <div id="top">
              <span id="img_game">
              </span>
          </div>

          <div id="center">
              <Link to="/page2">
                <button>JOUER</button>
              </Link>
          </div>
        </div>
      </div>
    )
}
