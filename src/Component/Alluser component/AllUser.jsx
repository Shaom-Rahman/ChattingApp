import React, { useEffect, useState } from 'react'
import CommonUser from '../Common/CommonUser'
import { getDatabase, ref, onValue, push, set} from "firebase/database";
import { useSelector } from 'react-redux';

const AllUser = () => { 

  // ----------------------- redux data ---------------------
  const ReduxUser = useSelector((state) => state.currentUser.value)
  // console.log(ReduxUser)
  // --------------------- state variables --------------------
  const [AllUserData , setAllUserData] = useState([])

  // --------------------- firebase variables ------------------
  const db = getDatabase();

  // --------------------- functions part --------------------
  const handelAdd = (AddReq)=>{
    // console.log(AddReq)
    set(push(ref(db, 'FriendRequest/' )), {
      senderId: ReduxUser.uid ,
      senderName: ReduxUser.displayName ,
      senderPhoto: ReduxUser.photoURL , 
      receiverId: AddReq.key ,
      receiverName: AddReq.userName , 
      receiverPhoto: AddReq.userPhoto , 
    });
  }
  // -------------------- realtime data --------------------- 

 useEffect(()=>{
  onValue(ref(db , 'allUsers/') , (snapshot) =>{
       // console.log(snapshot.val())

    let Arr = []
    snapshot.forEach((item)=>{
        // console.log(item.val())
        // Arr.push(item.val())
        // console.log(item.val())
        // console.log(item.key)

        if(item.key != ReduxUser.uid){
          Arr.push({...item.val() , key: item.key})
        }
    })
        // console.log(Arr)
  setAllUserData(Arr)
  } ) ;
  
 } , [])

console.log(AllUserData)
  return (
    <>
    <section>
      <div className="container">
        <h1 className='font-Popins font-bold text-3xl px-[20px] py-[30px]'>All Users </h1>
      {
        AllUserData.map((item)=> (
          <div key={item.key} >
            <CommonUser CommonUserPhoto={item.userPhoto } CommonUserName={item.userName} 
            CommonButtonAdd={'ADD'} CommonButtonRemove={'REMOVE'} CommonButtonClick={()=>handelAdd(item)}
            //  CommonButtonClick={()=> handelAdd(item)}
              />
        </div>
        ))
      }
      </div>
    </section>
      
    </>
  )
}

export default AllUser