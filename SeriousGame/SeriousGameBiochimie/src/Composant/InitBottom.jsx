import React from 'react';

export default function InitBottom(props) {
  return (
    <div>
        <div id="bottom-response-panel">
            <button></button>
        </div>
        <div id="bottom-question-panel">
            <p id="question-zone">
                {props.question}
            </p>
        </div>
    </div>
  );
}
