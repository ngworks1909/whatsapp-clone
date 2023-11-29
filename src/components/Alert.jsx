import React from 'react'
import '../css/Alert.css'

export default function Alert(props) {
  return (
    <>
    <div class={`alert alert-${props.type}`} role="alert">
     {props.message}
   </div>
      
    </>
  )
}