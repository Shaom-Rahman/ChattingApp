import React from 'react'
import { IoCaretDownSharp } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';




const Register = () => {
  const navigate = useNavigate()

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
                <h2> Create Account</h2>
                <div className="otherAccount">
                  <button className='flex items-center justify-center gap-[17px] py-[14px] '> 
                    <FcGoogle className='text-4xl' />
                    <p> Sign up with google</p> 
                  </button>
                  <button className='flex items-center justify-center gap-[17px] py-[14px] '> 
                    <FaFacebook className='text-4xl text-blue-800' />
                    <p> Sign up with google</p> 
                  </button>
                </div>
                <h3> - OR - </h3>

              </div>
              <div className="registerMainForm ">
                <form>
                  {/* From Uiverse.io by WhiteNervosa  */}
                  <div className="form__group field">
                    <input type="text" className="form__field" />
                    <label className="form__label">Full name</label>
                  </div>
                  <div className="form__group field">
                    <input type="text" className="form__field"/>
                    <label className="form__label">Email Address</label>
                  </div>
                  <div className="form__group field">
                    <FaRegEyeSlash className='eyes text-2xl text-[#A6A6A6]' /> 
                    <input type="password" className="form__field"/>
                    <label className="form__label">Password</label>  
                  </div>  
                  <div className='createButton pt-[84px] px-7'> 
                      <button > Create Account</button> 
                      <p> Already have an account? <span onClick={()=> navigate('/login')} className='text-BrandColor'> Login</span></p>     
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