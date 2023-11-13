/* eslint-disable react/prop-types */
import React from 'react'

export default function SenderButton({NamesPlayer}) {

  const Send = () =>{
    {NamesPlayer.map((element, index) => (
      console.log(element)
    ))}
    
  }

  return (
    <div onClick={Send}>SenderButton </div>
  )
}
