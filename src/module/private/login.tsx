import React from 'react';
import '../../css/login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';



export const Login=()=>{
    const navigate=useNavigate()
    const client = axios.create({
        baseURL: "http://localhost:3000" 
      });
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [msg, setMsg]=useState('')
    async function login() {
     
        try {
            const res = await client.post('/api/v1/auth/login',{
                 username:username,
                 password:password,
                })
                console.log(res.data)
                var d = new Date();
                d.setTime(d.getTime() + (10*24*60*60*1000));
                document.cookie='token='+res.data.token+"; expires="+d.toUTCString
                navigate('/enterprise/v1/order')
            }catch(error:any){
               setMsg(error.response.data.msg)
            }
        }

    
    return(
        <div className='loginWraper'>
            <div className='username'>
            <a >Username</a>
            <input className='usernameinput' 
            placeholder='insert your UserName'
            onChange={(e)=>{setUsername(e.target.value);if(msg!==''){setMsg('')}}}/>
            </div>
            <div className='password'>
            <a >Password</a>
            <input className='passwordinput'
             placeholder='insert your Password'
            onChange={(e)=>{setPassword(e.target.value);if(msg!==''){setMsg('')}}}/>
            </div>
            <div className='login'>
            <button className='signin' onClick={(e)=>{
                e.preventDefault();
                login()
            }} >Sign in</button>
            <p className='msg'>{msg}</p>
            </div>
        </div>
    )
}