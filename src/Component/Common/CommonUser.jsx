import React from 'react'
import './CommonUser.css'

const CommonUser = ({CommonUserName , CommonUserPhoto , CommonButtonAdd , CommonButtonRemove , CommonButtonClick }) => {
  return (
    <>
    <section className='p-[60px]'>
      <div className="container">
        <div className="card  ">
           <div className="singelCard flex justify-between items-center py-1 gap-[30px]">
              <img className='w-[40px] h-[40px] rounded-full' src={CommonUserPhoto} alt='picture'/>
              <p className="cookieHeading font-Popins font-semibold">{CommonUserName} </p>
             </div>
          <div  className="buttonContainer ">
                  <button onClick={CommonButtonClick} className="acceptButton">{CommonButtonAdd} </button>
                  <button onClick={CommonButtonClick} className="declineButton"> {CommonButtonRemove} </button>
           </div>
       </div>
    </div>
       
</section>
        
    </>
  )
}

export default CommonUser