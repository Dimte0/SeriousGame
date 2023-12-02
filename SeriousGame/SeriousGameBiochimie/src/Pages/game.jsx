/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState, useEffect } from 'react'
import GameComponent from '../Composant/Game/GameComponant'
import UnityComp from '../Composant/Game/Part/UnityComp'
import { useLocation } from 'react-router-dom'
import valol from '../Composant/Game/valol.png'

import "./Pages.css"

export default function game() {

  //State
  let src = '../Composant/Game/istockphoto-1023726474-612x612.jpg'
  const location = useLocation()

  //const [Player, setPlayer] = useState()
  const [IsMouvement, setIsMouvement] = useState(false)
  const [IsPrint, setIsPrint] = useState(false)
  const [imageSrc, setImageSrc] = useState('../Composant/Game/istockphoto-1023726474-612x612.jpg');
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

  const changeImage = () => {
    setImageSrc('../Composant/Game/valol.png');
    // Vous pouvez également charger l'image de manière asynchrone ici si nécessaire
  };

  const UpdateImage = (srce) =>{
    src = '../Composant/Game/valol.png'
    console.log("la valeur de l'image :"+src)
  }

  useEffect(() => {
    const element = document.querySelector('.imagePrint');
  
    if (element.classList.contains('slide-top-mid')) {
      // Réduire l'opacité de l'autre bloc ici
      const autreBloc = document.querySelector('.UnityProprieties');
      autreBloc.style.opacity = '0.2'; // Opacité réduite à 50%
    } else {
      // Si la classe slide-in est retirée, rétablir l'opacité normale
      const autreBloc = document.querySelector('.UnityProprieties');
      autreBloc.style.opacity = '1'; // Opacité normale
    }
  }, [IsPrint]); // Exécute le code lorsque IsPrint change

  //render style={{ visibility : IsPrint ? 'visible' : 'hidden'} 
  //{`"imagePrint" ${IsPrint? 'slide-in' : 'slide-out'}`}
  return (
    <div className='Game'>
        {//IsPrint &&
        (
        <div 
        className= {`imagePrint ${IsPrint ? ' slide-top-mid' : ' slide-mid-top'}`}
        style={{ visibility : IsPrint ? 'visible' : 'hidden'}}
        >
            <img onClick={PrintegamI} 
              // eslint-disable-next-line no-undef
              src={require(src)}
              alt='Image'/>
          
        </div>
        )}
        <div>
            <UnityComp ref={UnityRef}/>
        </div>
        <div>
            <GameComponent ListPlayers={location.state.ListData} UpdateMouv={UpdateMouv} PrintImage={PrintImage} UpdateImage={UpdateImage}/>
        </div>
    </div>
  )
}
