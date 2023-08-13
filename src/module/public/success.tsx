import React from 'react'
import { Link } from 'react-router-dom'
import success from '../../image/success 1.png'
import '../../css/success.css'

export const Success=()=>{

   return (
      <div className="ORDER-SUCCESS">
        <div className="successWraper">
          <img className="successImg" alt="Success" src={success} />
          <div className="SucessWraper">
            <p className="SuccessText">We have sent the order information to your email</p>
          </div>
        <Link className="buymoreWrapper" to ={'/products'}>
          <button className="buyMore">
            <h2>By more</h2></button>
        </Link>
        </div>
      </div>
    )
}