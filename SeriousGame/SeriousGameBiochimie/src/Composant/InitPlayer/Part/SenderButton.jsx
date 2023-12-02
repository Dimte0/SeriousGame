/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

export default function SenderButton({NamesPlayer}) {

  const navigate = useNavigate();

  const Send = () =>{
    {NamesPlayer.map((element, index) => (
      console.log(element)
    ))}
    
    navigate("/page3", {state : {ListData : NamesPlayer}})

  }

  return (
    <div id="Sender" onClick={Send}>SenderButton </div>
  )
}
