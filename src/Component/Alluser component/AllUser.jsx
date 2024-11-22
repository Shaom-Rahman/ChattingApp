import React, { useEffect, useState } from 'react'
import CommonUser from '../Common/CommonUser'
import { getDatabase, ref, onValue, push} from "firebase/database";
import { useSelector } from 'react-redux';

const AllUser = () => { 

  // ----------------------- redux data ---------------------
  const reduxUser = useSelector((state)=> state.currentUser.value)
  // --------------------- state variables --------------------
  const [alluserdata , setalluserdata] = useState([])

  // --------------------- firebase variables ------------------
  const db = getDatabase();

  // --------------------- functions part --------------------
  // -------------------- realtime data --------------------- 

   useEffect(() =>{
     onValue(ref(db , 'allUsers/') , (snapshot) => {
//  console.log(snapshot)

    let arr =[]
    snapshot.forEach((item)=>{

     if(item.key != reduxUser.uid){
      arr.push({...item.val() , key:item.key })

     }
       // console.log(item.key)
      // console.log(item.val())
      // arr.push(item.val())
    })

    setalluserdata(arr)
     });
   } , []) ;

   console.log(alluserdata)

  return (
    <>
    <section>
    <h1 className='font-Popins font-bold text-3xl px-[20px] py-[30px]'>All Users </h1>
    {
      alluserdata.map((item)=>(
        <CommonUser CommonUserPhoto={item.userphoto} CommonUserName={item.username}/>
      )
      )
    }
    </section>
      
    </>
  )
}

export default AllUser