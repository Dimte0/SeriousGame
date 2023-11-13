/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

export default function UnityComp({mouv}) {

  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "../My_Game/Build/My_Game.loader.js",
    dataUrl: "../My_Game/Build/My_Game.data",
    frameworkUrl: "../My_Game/Build/My_Game.framework.js",
    codeUrl: "../My_Game/Build/My_Game.wasm",
  });

  const MovePlayer = (x) =>{
    sendMessage("Player1", "MoveNext", x); 
  }
  useEffect(() =>{
    MovePlayer(mouv)
  },[mouv])

  return (
    <div>
    <Unity 
      unityProvider={unityProvider} 
      style={{
        width: "800px",
        height : "400px",
        border : "2px solid black",
        background : "red",
      }}
    />
    {/* <button onClick={MovePlayer}>Appeler la fonction Unity</button>
    <Game Bouge={MovePlayer}></Game> */}
    </div>
  )
}
//<button onClick={MovePlayer}>Appeler la fonction Unity</button>
