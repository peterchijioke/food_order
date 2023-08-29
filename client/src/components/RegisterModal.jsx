import React, { useState } from 'react'
import { TailSpin } from  'react-loader-spinner'
const RegisterModal = ({loginState,setLoginState,setMainLoginModalState}) => {
  const [email,setEmail]=useState()
  const [phone,setPhone]=useState()
  const [password,setPassword]=useState()
  const [name,setName]=useState()
  const [progress,setProgress]=useState(false)
  const handleChange=(setState)=>(e)=>{
setState(e.target.value)
  }
  const _handleSubmit=async(e)=>{
    e.preventDefault()


    const response = await fetch("http://localhost:5001/api/auth/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
        
      },body:JSON.stringify({
        name,phone,password,email
      })
    })

    const result = await response.json()
    if(result.status){
      setLoginState(false)
      setMainLoginModalState(true)
    
    }
    console.log('result',result);



  }
  return (
<div  id="myModal" className={loginState?"modal open-modal":"modal"}>
  <div onClick={()=>setLoginState(false)} className='close'>X</div>
  <div className="modal-content">
 <div className='login-wrap-txt'> <span className='span'>Register</span></div>
 <form onSubmit={_handleSubmit} className='form-register' action="">
  <input onChange={handleChange(setName)} placeholder='name' className='input-register'/>
   <input onChange={handleChange(setPhone)} placeholder='phone' className='input-register'/>
   <input onChange={handleChange(setEmail)}  placeholder='email' type='email' className='input-register'/>
    <input onChange={handleChange(setPassword)}  placeholder='password' type='password' className='input-register'/>
{!progress&&<input type='submit' className='button-register' />}

{progress && <TailSpin
  height="50"
  width="50"
  color="#e64942"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>}
 </form>
  </div>
  </div>

  )
}

export default RegisterModal