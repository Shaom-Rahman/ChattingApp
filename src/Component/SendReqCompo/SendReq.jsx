import React, { useEffect, useState } from 'react'
import CommonUser from '../Common/CommonUser';
import { useSelector } from 'react-redux';
import { getDatabase, onValue, ref } from 'firebase/database';

const SendReq = () => {
  // ----------------------- redux data ---------------------
  const ReduxUser = useSelector((state) => state.currentUser.value)

// --------------------- state variables --------------------
const [AllRequest , setAllRequest] = useState([])

// --------------------- firebase variables ------------------
const db = getDatabase();

// --------------------- real time data base --------------------
useEffect(()=>{
    onValue(ref(db , 'FriendRequest/'), (snapshot) => {
    let Arr = []
    snapshot.forEach((item)=>{
      if(item.val().senderId == ReduxUser.uid ){
            Arr.push({...item.val(), key: item.key })
      }
    })
      setAllRequest(Arr)
  });
} , [])


  return (
    <>
      <section>
      <div className="container">
        <h1 className='font-Popins font-bold text-3xl px-[20px] py-[30px]'> Send Request </h1>
      {
        AllRequest.map((item)=> (
          <div key={item.key} >
            <CommonUser CommonUserPhoto={item.receiverPhoto } CommonUserName={item.receiverName} 
            CommonButtonAdd={'REMOVE'} CommonButtonRemove={'ADD'} CommonButtonClick={()=>handelAdd(item)}
              />
        </div>
        ))
      }
      </div>
    </section>

    </>
  )
}

export default SendReq