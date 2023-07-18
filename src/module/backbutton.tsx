import React from "react";
import back from '../image/arrow-left-solid.svg'
import { useNavigate } from "react-router";
import '../css/back.css'


export const Back =()=>{
    const history = useNavigate()
    return  <img role="button" onClick={()=>history(-1)}  className="backButton" src={back} width={'30px'} height={'30px'}/>
}