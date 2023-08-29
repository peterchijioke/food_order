import React,{useState} from 'react'
import { TailSpin } from  'react-loader-spinner'
const PaymentModal = ({loginState,setLoginState}) => {
  
  const [progress,setProgress]=useState(false)
   const [name,setName]=useState()
    const [number,setNumber]=useState()
     const [date,setDate]=useState()
     const [cvv,setCvv]=useState()

   

  const _handleOrderItem=async(product)=>{
    const access_token = localStorage.getItem('access_token')

    if (!access_token) {
      alert("Login to place an order")
      return
    }

      try {
        const response=await fetch("",{
        body:JSON.stringify({name:product.name,product:product.price}),
        headers:{
          "Authorization":`Bearer ${access_token}`
        }
      })
      const result = await response.json()
      console.log(product)
      } catch (e) {
        console.log(e.message)
      }
  }

  const _handleChange=(setState)=>(e)=>{
    setState(e.target.value)
  }
  return (
<div  id="myModal" className={loginState?"modal open-modal":"modal"}>
  <div onClick={()=>setLoginState(false)} className='close'>X</div>
  <div className="modal-content">
 <div className="checkout-container">
     <h3 className="heading-3">Credit card checkout</h3>
    <form  style={{width:'100%'}}>
       <Input onChange={_handleChange(setName)} label="Cardholder's Name" type="text" name="name" />
     <Input onChange={_handleChange(setNumber)} label="Card Number" type="number" name="card_number" imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png" />
      <div className="row">
        <div className="col">
          <Input onChange={_handleChange(setDate)} label="Expiration Date" type="month" name="exp_date" />
        </div>
        <div className="col">
          <Input onChange={_handleChange(setCvv)} label="CVV" maxlength={4} type="number" name="cvv" />
        </div>
      </div>
      <Button onClick={_handleOrderItem} text="Place order" />
    </form>
    </div>
  </div>
  </div>

  )
}

const Input = (props) => (
  <div className="input-checkout">
    <label>{props.label}</label>
    <div className="input-field">
      <input style={{width:'100%',color:'#000'}}  {...props} />
      <img src={props.imgSrc}/>
    </div>
  </div>
);
const Button = (props) => (
  <button className="checkout-btn" type="button" {...props}>{props.text}</button>
);

export default PaymentModal