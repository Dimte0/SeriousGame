/* eslint-disable react/prop-types */

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";


//export default function QuestionPanel({ref, isVisible, resolvePromise, ListButton, phrase, feedback}) {
// eslint-disable-next-line react/display-name
const QuestionPanel = forwardRef((props, ref)=>{
  const {isVisible, resolvePromise, ListButton, phrase, feedback} = props;
  //state
  const [isVisiblee, setIsVisible] = useState(true)
  const [valTrue, setValTrue] = useState(null)
  const [valFalse, setValFalse] = useState(null)
  //comportement Composant
  const performAction = async (id) => {
    //setIsVisible(false)
    resolvePromise(id);
  };

  const attendreDeuxSecondes = () =>{
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  const performAction2 = () =>{
    resolvePromise()
  }


  //comportement Logique

  const CreateButton = () =>{

    return(
      <div>
        {ListButton.map((but) =>(
          <button key={but.id} onClick={() => performAction(but.id)} 
            style={{
              backgroundColor : valTrue === but.id ? 'green' : valFalse === but.id ? 'red' : 'white'
            }}>
            {but.text}
          </button>
        ))}
      </div>
    )
  }

  useImperativeHandle(ref, ()=>({
    SettingVisible(x){
      console.log("IM IN")
      setIsVisible(x)
    },
    SettingVisibleTrue(x){
      setValTrue(x)
    },
    SettingVisibleFalse(x){
      setValFalse(x)
    }
  }))

  return (
    <div id="main">
        {isVisible &&(
        <div className={isVisiblee? 'slide-in' : 'slide-out'}>
          <div id="bottom-response-panel">
              <CreateButton/>
          </div>
          
          <div id="bottom-question-panel">
              <p id="question-zone">
                {phrase}
              </p>
              <p onClick={performAction2}>
                {feedback}
              </p>
          </div>
        </div>
        )}
    </div>

  )
//}
})
export default QuestionPanel;