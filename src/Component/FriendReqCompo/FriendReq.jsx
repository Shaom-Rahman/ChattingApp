import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDatabase, set, ref, onValue, remove, push } from "firebase/database";


const FriendReq = () => {
// ----------------------- redux data ---------------------
   const ReduxUser = useSelector((state) => state.currentUser.value)
          // console.log(ReduxUser)

// --------------------- state variables --------------------
   const [AllRequest , setAllRequest] = useState([])
// --------------------- firebase variables ------------------
  const db = getDatabase();
// ---------------------- function part -----------------------
    // ----------------    remove part  ----------------
const handelRemove = (CancelData)=>{
  remove(ref(db , 'FriendRequest/' + CancelData.key))  

} 
// -------------------- accept part ---------------
const handelConfirm = (FriendData)=>{
  set(push(ref(db, 'friends/' )), {
    friendId: FriendData.senderId ,
    friendName: FriendData.senderName ,
    friendPhoto: FriendData.senderPhoto , 
    currentUserID: ReduxUser.uid ,
    currentUserName: ReduxUser.displayName ,
    currentUserPhoto: ReduxUser.photoURL ,
  });
  remove(ref(db , 'FriendRequest/' + FriendData.key))
}

// --------------------- real time data base --------------------
   useEffect(()=>{
      onValue(ref(db , 'FriendRequest/'), (snapshot) => {
        // console.log(snapshot.val())
        let Arr = []
        snapshot.forEach((item)=>{
          // Arr.push(item.val())
          if(item.val().receiverId == ReduxUser.uid ){
            Arr.push({...item.val(), key: item.key })
          }
        })
        setAllRequest(Arr)
});
   } , [])

  return (
    <div className='p-[60px]'>
      <h2 className='font-Popins font-semibold text-5xl text-BrandColor pb-[30px]'> Friend Request </h2>
      {
        AllRequest.map((item)=>(
           <div key={item.key} className="max-w-md bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 h-36">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <img
            src={item.senderPhoto}
            alt='pc'
            className="w-24 h-24 rounded-full border-4 border-white shadow-md hover:ring-4 hover:ring-cyan-300 transition-all duration-300"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-16 pb-6 px-6">
        <h3 className="text-center text-3xl font-Popins font-semibold text-gray-800 hover:text-blue-600 transition-all duration-300">
          {item.senderName}
        </h3>
        <p className=" font-Popins text-xl font-medium text-center text-gray-500 mt-2">
          Sent you a friend request. Let’s connect!
        </p>

        {/* Buttons Section */}
        <div className="flex justify-around mt-6">
          <button
          onClick={()=> handelConfirm()}
            className="px-5 py-2 font-Popins text-xl font-normal bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all duration-300">
            Accept
          </button>
          <button
            onClick={()=> handelRemove(item)}
            className="px-5 py-2 font-Popins text-xl font-normal bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg active:scale-95 transition-all duration-300">
            Delete
          </button>
        </div>
      </div>

      {/* Decorative Hover Effect */}
      <div className="absolute inset-0 rounded-xl hover:bg-blue-50 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
    </div>
 
        ))
      }

    </div>
  )
}

export default FriendReq