import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../cookie";

import chevronDown from '../../image/chevronDown.svg'
import { Back } from "../backbutton";
import { FormProduct } from "./productparam";

export const CreateProduct=()=>{
    const token=getCookie('token')
  
    const client = axios.create({
      baseURL: "https://purchasing-v1.onrender.com" 
    });
    const navigate = useNavigate()

    const handleSubmit=async(formdata:any)=>{
     
   
    try{
      const res = await client.post('https://purchasing-v1.onrender.com/api/v1/products/',formdata,{
        headers:{authorization:'Bearer '+token}
        })
        console.log(res.data)
        navigate('/admin/products')
    }catch(error:any){
      console.log(error.config)
    }
  }
if(!token)
{
navigate('/admin/login')
}
return (
      <FormProduct postFuntion={handleSubmit} getFuntion={false}/>
      );
    }
  