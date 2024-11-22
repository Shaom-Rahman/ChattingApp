import React from 'react'
import './CommonUser.css'

const CommonUser = ({CommonUserName , CommonUserPhoto}) => {
  return (
    <>
    <section className='p-[60px]'>
    
<div className="card ">
    <div className="singelCard flex justify-between gap-[30px]">
        <img className='w-[10px] h-[10px]' src={CommonUserPhoto} alt='picture'/>
  <p className="cookieHeading">{CommonUserName} </p>

    </div>
    
  <div className="buttonContainer">
    <button className="acceptButton">Accept </button>
  <button className="declineButton"> Remove</button>
  </div>

</div>

    </section>
        
    </>
  )
}

export default CommonUser