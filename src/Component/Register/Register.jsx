import React, { useState } from 'react'
import { IoCaretDownSharp } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithPopup } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast } from 'react-toastify';
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { HashLoader } from 'react-spinners';
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";



const Register = () => {

// --------------------------- useState ---------------------------- 

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [nameError , setNameError] = useState('')
  const [emailError , setEmailError] = useState('')
  const [passError , setPassError] = useState('')
  const navigate = useNavigate('')
  const [loading , setLoading] = useState(false)

// -------------------------  Add firebase variables --------------------

const auth = getAuth();
const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

// --------------------------- function ----------------------------
  
  const handelSubmit = (e)=>{
    // setLoading(true)
    e.preventDefault()
    if (!name){
      setNameError('Enter a name')
    }
    if (!email){
      setEmailError('Enter an email')
    }
    if (!password){
      setPassError ('Enter a password')
    }
    else{
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    // ---------- Email verification sent msg -----------------
    sendEmailVerification(auth.currentUser)
  .then(() => {
     setLoading(false)
    //  ---------------- set user name and profile pic ---------------

    updateProfile(auth.currentUser, {
      displayName: name, 
      photoURL: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
    }) 
    .then(()=>{
      navigate('/login')
      toast.success('Email verification send!', {
      position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, 
      pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
      transition: Slide,
      });
    })
  });
  })
  // ---------- Error msg ------------------
  .catch((error) => {
    setLoading(false)
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == 'auth/email-already-in-use'){
      toast.error(' Email has already taken  !', {
        position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, 
        pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
        transition: Slide,
        });
    }
  }) 
    }
  };
//  ------------------------- google sign in method -----------------
const handelGoogle =()=>{
  signInWithPopup(auth, GoogleProvider)
  .then((result) => {
    // navigate('/home')
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}
// ------------------------ Facebook sign in method -------------
  // const handelFacebook = ()=>{
  //   signInWithPopup(auth, provider)
  // .then((result) => {
  //   const user = result.user;

  //   const credential = FacebookAuthProvider.credentialFromResult(result);
  //   const accessToken = credential.accessToken;

  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   const email = error.customData.email;
  //   const credential = FacebookAuthProvider.credentialFromError(error);
  // });
  // }
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
                <div className="language flex justify-end gap-2 items-center pt-[35px] px-2">
                  <p> English(UK) </p><IoCaretDownSharp className='text-2xl text-[#C4C4C4]' />
                </div>                                                   
                <h2> Create Account</h2>
                <div className="otherAccount">
                  <button onClick={handelGoogle} className='flex items-center justify-center gap-[17px] py-[14px] '> 
                    <FcGoogle className='text-4xl' />
                    <p> Sign up with google</p> 
                  </button>
                  <button  className='flex items-center justify-center gap-[17px] py-[14px] '> 
                    <FaFacebook className='text-4xl text-blue-800' />
                    <p> Sign up with Facebook</p> 
                  </button>
                </div>
                <h3> - OR - </h3>
              </div>
              <div className="registerMainForm ">
                <form>
                  {/* From Uiverse.io by WhiteNervosa  */}

                  <div className="form__group field">
                    <input onChange={(e)=> {setName (e.target.value) , setNameError('')}} type="text" className="form__field" />
                    <label className="form__label">Full name</label>
                    <h2 className='text-base font-medium text-red-500 pt-1'> {nameError}</h2>
                  </div>
                  <div className="form__group field">
                    <input onChange={(e)=> {setEmail(e.target.value) , setEmailError('')}} type="text" className="form__field"/>
                    <label className="form__label">Email Address</label>
                    <h2 className='text-base font-medium text-red-500 pt-1'> {emailError}</h2>
                  </div>
                  <div className="form__group field">
                    <FaRegEyeSlash className='eyes text-2xl text-[#A6A6A6]' /> 
                    <input onChange={(e) => {setPassword(e.target.value) , setPassError('')}} type="password" className="form__field"/>
                    <label className="form__label">Password</label>  
                    <h2 className='text-base font-medium text-red-500 pt-1'> {passError}</h2>
                  </div>  
                  <div className='createButton pt-[60px] px-7'> 
                    {
                      loading ?
                      <button onClick={handelSubmit}> <HashLoader color='#CC2B52' size={25}  /> </button>
                      :
                      <button onClick={handelSubmit} > Create Account</button> 
                    }
                     
                  </div>  
                  <div className="otherTextpart">
                  <p> Already have an account? <span onClick={()=> navigate('/login')} className='text-BrandColor hover:text-blue-500'> Login</span></p>
                  </div>
                </form>
              </div>
            </div>       
          </div>
    </section>
    
    </>
  )
}

export default Register