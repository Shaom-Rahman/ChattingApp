import React, { useState } from 'react'
import { IoCaretDownSharp } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Slide, toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { GoogleAuthProvider } from "firebase/auth";
import { userData } from '../../Slice/UserSlice';
import { useDispatch } from 'react-redux';
import { getDatabase, ref, set } from "firebase/database";



const Login = () => {
 
  // --------------------------- useState ---------------------------
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [emailError, setemailError] = useState('')
  const [passError, setpassError] = useState('')
  const navigate = useNavigate('')
  const [loading , setLoading] =  useState(false)

  //  --------------------- redux variables -----------------------
  const dispatch = useDispatch()
  const db = getDatabase();


  // ------------------------  firebase variable --------------
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // --------------------------- function -------------------------
  const handelsubmit = (e)=>{
    setLoading(true)
    e.preventDefault() 
    if (!email){
      setemailError('Enter email')
    }
    if (pass==''){
      setpassError('Enter password')
    } else{

// ------------------ email verification -----------------
      signInWithEmailAndPassword(auth, email, pass)   //----  login promise    

  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  //  console.log(userCredential.user)
   
   if(user.emailVerified === false){
    toast.warn('Email is not verified!', {
      position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true,
      pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
      transition: Slide,
      });
   } else{
    navigate('/')
    // -------------------- set data to the redux ------------- 
    dispatch(userData(userCredential.user))
    console.log(userCredential.user)

    toast.success('Login Success!', {
      position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true,
      pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
      transition: Slide,
      });

      // --------------------- set data to local store ------------------
      localStorage.getItem('user' , JSON.stringify(userCredential.user)  )
      // ------------------- set user real time codes -----------------
      set(ref(db, 'allUsers/' + userCredential.user.uid ), {
        username: userCredential.user.displayName ,
        userphoto : userCredential.user.photoURL,
      });
   }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    if (errorCode == 'auth/invalid-credential')
    {
      toast.warn('Something went wrong!', {
        position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true,
        pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
        transition: Slide,
        });
    }
  });
    }
  }
  // ----------------------- google sign in ---------------------
  const handelGoogle = ()=>{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  

  return (
    <>
    <section className='register'>
          <div className="registerRow">
            <div className="registerText">
              <h1 className="type">Find 3D Objects, Mockups and <br/>
              Illustrations here.</h1>
              <div className='regImage'>
                <img src='image/registerbg.png' alt='bg' />
              </div>
            </div>
            <div className="registerForm">
              <div className="registerFormHead">
                <div className="language flex justify-end gap-2 items-center pt-[45px] px-2">
                  <p> English(UK) </p><IoCaretDownSharp className='text-2xl text-[#C4C4C4]' />
                </div>                                                   
                <h2> Login</h2>
                <div className="otherAccount">
                  <button onClick={handelGoogle} className='flex items-center justify-center gap-[17px] py-[14px] '> 
                    <FcGoogle className='text-4xl' />
                    <p> Sign in with google</p> 
                  </button>
                  <button className='flex items-center justify-center gap-[17px] py-[14px] '> 
                    <FaFacebook className='text-4xl text-blue-800' />
                    <p> Sign in with Facebook</p> 
                  </button>
                </div>
                <h3> - OR - </h3>
              </div>
              <div className="registerMainForm ">
                <form>
                  <div className="form__group field">
                    <input onChange={(e)=>{ setEmail(e.target.value) , setemailError('') }} type="text" className="form__field"/>
                    <label className="form__label">Email Address</label>
                    <h2 className='text-base font-medium text-red-500 pt-1'> {emailError} </h2>
                  </div>
                  <div className="form__group field">
                    <FaRegEyeSlash className='eyes text-2xl text-[#A6A6A6]' /> 
                    <input onChange={(e)=>{setPass(e.target.value) , setpassError ('') }} type="password" className="form__field"/>
                    <label className="form__label">Password</label> 
                    <h2 className='text-base font-medium text-red-500 pt-1'> {passError} </h2> 
                  </div>  
                  <div className='createButton pt-[60px] px-7'> 
                    {
                      loading ?
                      <button onClick={handelsubmit}> <HashLoader color='#CC2B52' size={25}  /> </button>
                      :
                      <button onClick={handelsubmit} > Log In </button> 
                    }
                  </div>  
                  <div className='text-xl font-Popins font-normal text-center text-slate-400 pt-4'> 
                    <Link to={'/forgetpass'}> Forget Password ? Reset ?</Link>
                  </div>
                  <div className="otherTextpart">
                  <p> Don't have an account? <span onClick={()=> navigate('/register')} className='text-BrandColor hover:text-blue-500'> Sign Up</span></p>
                  </div> 
                </form>
              </div>
            </div>          
          </div>
    </section>
    
    
    </>
  )
}

export default Login