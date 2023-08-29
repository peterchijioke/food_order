import React,{useState} from 'react'
import { TailSpin } from  'react-loader-spinner'
const LoginModal = ({loginState,setLoginState}) => {
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [progress,setProgress]=useState(false)

  const handleChange=(setState)=>(e)=> setState(e.target.value)

  const _handleSubmit = async(e)=>{
    e.preventDefault()
    setProgress(true)
    if (!email || !password) {
      alert("All fields are required")
      return
    }


    // console.log({
    //   email,password
    // })
    // setProgress(false)
    // return
     const response = await fetch("http://localhost:5001/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
      password,email
      })
    })

    const result = await response.json()
    if (result.status) {
      localStorage.setItem('access_token',result.access_token);
      localStorage.setItem('user',JSON.stringify(result.user));
       setProgress(false)
       setLoginState(false)
    }
    setProgress(false)
  }
  return (
<div  id="myModal" className={loginState?"modal open-modal":"modal"}>
  <div onClick={()=>setLoginState(false)} className='close'>X</div>
  <div className="modal-content">
 <div className='login-wrap-txt'> <span className='span'>Login</span></div>
 <form  className='form-register' onSubmit={_handleSubmit}>
  <input type='email' onChange={handleChange(setEmail)} placeholder='Email' className='input-register'/>
   <input onChange={handleChange(setPassword)} placeholder='Password' className='input-register'/>
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

export default LoginModal