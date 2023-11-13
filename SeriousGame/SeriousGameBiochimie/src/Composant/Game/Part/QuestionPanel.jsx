/* eslint-disable react/prop-types */


export default function QuestionPanel({resolvePromise, ChangeIsQuestion, ListButton, phrase, feedback}) {
  
  //state
  
  //comportement Composant
  const performAction = (id) => {
    // Code pour effectuer l'action du composant enfant
    //ChangeIsQuestion();
    resolvePromise(id);
  };

  const performAction2 = () =>{
    resolvePromise()
  }

  //comportement Logique

  const CreateButton = () =>{
    return(
      <div>
        {ListButton.map((but) =>(
          <button key={but.id} onClick={() => performAction(but.id)} >
            {but.text}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div id="main">
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

    </div>

  )
}
