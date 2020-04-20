import React from 'react'


function Close() {
  const onCloseButton = (e) => {
    e.target.classList.toggle("shown")
    e.target.classList.toggle("closed")
    console.log(e.target.classList)
    e.target.parentElement.classList.toggle("offScreen")
  }
  return (
    <div onClick={onCloseButton} className="closeBtn shown">&#43;</div>
  )
}

export default Close
