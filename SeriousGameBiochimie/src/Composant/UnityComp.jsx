import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";



export default function UnityComp() {

  const { unityProvider } = useUnityContext({
    loaderUrl: "../My_Game/Build/Builds.loader.js",
    dataUrl: "../My_Game/Build/Builds.data",
    frameworkUrl: "../My_Game/Build/Builds.framework.js",
    codeUrl: "../My_Game/Build/Builds.wasm",
  });

  return (
    <Unity 
      unityProvider={unityProvider} 
      style={{
        width: "600px",
        height : "400px",
        border : "2px solid black",
        background : "red",
      }}
    />
  )
}
