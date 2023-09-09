import React,{useEffect, useState} from 'react'
import { TailSpin } from  'react-loader-spinner'
import CheckoutProductDisplay from './CheckoutProductDisplay'


const access_token = localStorage.getItem('access_token')

const PaymentModal = ({loginState,setLoginState,product}) => {
  
  const [progress,setProgress]=useState(false)
   const [name,setName]=useState()
   const [checkout,setCheckout]=useState(false)
    const [number,setNumber]=useState()
     const [date,setDate]=useState()
     const [cvv,setCvv]=useState()

  useEffect(()=>{
     return ()=>{
       setName()
      setCheckout(false)
      setDate()
      setCvv()
      setProgress(false)
      setNumber()
     }
  },[])
   

  const _handleOrderItem=async()=>{
setProgress(true)
console.log(product)

 const data = {
      name,number,cvv
    }

    console.log(access_token)
    if (!name||!number||!cvv) {
      setProgress(false)
      alert("All field are required")
      return
    }

    if (number.length>16 || number.length<16) {
      alert('Card number must be 16 digits')
      setProgress(false)
      return
      
    }
     if (cvv.length>3|| cvv.length<3) {
      alert('cvv must be 3 digits')
      setProgress(false)
      return
      
    }
console.log(access_token)
    if (!access_token) {
      setProgress(false)
      alert("Login to place an order")
      setLoginState(false);
      return
    }
      try {
        const response=await fetch("http://localhost:5001/api/product/order",{
        body:JSON.stringify({name:product.name,price:product.price}),
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          "Authorization":`Bearer ${access_token}`
        }
      })

      const result = await response.json()
      console.log(result)
      if (result.status) {
        setProgress(false)
        setLoginState(false)
        alert(`Your Order has been placed successfully`)
        return
      }
         setProgress(false)
      } catch (e) {
        console.log(e.message)
      }
  }

  const _handleChange=(setState)=>(e)=>{
    setState(e.target.value)
  }

  
  return (
<div  id="myModal" className={loginState?"modal open-modal":"modal"}>
  <div onClick={()=>{setLoginState(false)
   setName()
      setCheckout(false)
      setDate()
      setCvv()
      setProgress(false)
      setNumber()}
  } className='close'>X</div>
  <div className="modal-content">
 {checkout&&checkoutForm(setCheckout)}
{!checkout&& <CheckoutProductDisplay setCheckout={setCheckout} product={product}/>}

  </div>
  </div>

  )

  function checkoutForm(setCheckout) {
    return <div className="checkout-container">
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <h3 className="heading-3">Credit card checkout</h3>
        <input onClick={()=>setCheckout(false)} type='button' style={{height:30,padding:5,background:'#e64942' ,color:'#fff',borderRadius:5}} value={'Back to Product Preview'}/>
      </div>
      <form style={{ width: '100%' }}>
        <Input onChange={_handleChange(setName)} label="Cardholder's Name" type="text" name="name" />
        <Input onChange={_handleChange(setNumber)} label="Card Number" type="number" name="card_number" imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png" />
        <div className="row">
          <div className="col">
            {/* <Input onChange={_handleChange(setDate)} label="Expiration Date" type="month" name="exp_date" /> */}
          </div>
          <div className="col">
            <Input onChange={_handleChange(setCvv)} label="CVV" maxlength={4} type="number" name="cvv" />
          </div>
        </div>
        {!progress && <Button onClick={_handleOrderItem} text="Pay" />}
        {progress && <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
          <TailSpin
            height="50"
            width="50"
            color="#e64942"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true} /></div>}
      </form>
    </div>
  }
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