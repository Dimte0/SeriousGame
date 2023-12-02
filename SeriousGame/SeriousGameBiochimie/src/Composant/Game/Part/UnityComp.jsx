/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Unity, useUnityContext } from "react-unity-webgl";
import { forwardRef, useImperativeHandle, useState } from "react";

const UnityComp = forwardRef((props, ref) => {

  const [IsMouvCamera, setIsMouvCamera] = useState(false)

  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "../My_Game/Build/My_Game.loader.js",
    dataUrl: "../My_Game/Build/My_Game.data",
    frameworkUrl: "../My_Game/Build/My_Game.framework.js",
    codeUrl: "../My_Game/Build/My_Game.wasm",
  });

  

  useImperativeHandle(ref, () =>({
    async MovePlayer(x, id) {
      /* if(!IsMouvCamera) setIsMouvCamera(true)
      else sendMessage("Main Camera", "SwitchToNextPlayer") */
      sendMessage("Player"+id, "MoveNext", x);
    }
  }))

  return (
    <div className="UnityProprieties">
    <Unity 
      unityProvider={unityProvider} 
      style={{
        position : "relative",
        marginTop :"25px",
        width: "800px",
        height : "400px",
        border : "2px solid black",
        background : "red",
        borderRadius : "50px"
      }}
    />
    </div>
  )
})
//<button onClick={MovePlayer}>Appeler la fonction Unity</button>
export default UnityComp;