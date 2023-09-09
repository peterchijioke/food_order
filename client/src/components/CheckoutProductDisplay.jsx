import React, { useEffect, useState } from "react";

export default function CheckoutProductDisplay({ product,setCheckout }) {
 
  useEffect(()=>{
    if (product) {

  console.log("============PRODUCT=====",product)
      
    }
  },[product])

  return (
    <div style={{ width: "100%", height: "fit-content" }}>
    <div style={{width:'100%', display:'flex',flexDirection:'column',gap:'1rem'}}>
    <span style={{fontWeight:'bolder',fontSize:'18px'}}>Product Details</span>
       
    <ItemDes title='Name' data={product.name}/>
    <ItemDes title='Price' data={product.price}/>
      <div style={{width:50,height:50,borderRadius:10,background:'#133',objectFit:'contain',overflow: 'hidden',}}>
         <img style={{height:'100%',width:'100%'}} src={product.image} alt="" />
      </div>
    </div>
    <input onClick={()=>setCheckout(true)} style={{width:'100%',height:30,background:"#fc4958",color:'#fff',outline:'none',border:'1px solid #000',cursor:'pointer',borderRadius:'5px',marginTop:'2rem'}} value="Checkout" type='button' />
    </div>
  );
}


const ItemDes = ({data,title})=> <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'10px'}}>
          <span style={{fontWeight:'bold'}}>{title}:</span>
          <label>{data}</label>
        </div>
