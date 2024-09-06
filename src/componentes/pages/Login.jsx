import React, { useContext, useEffect } from 'react'
import login from './../../assets/login/login.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import summaryAPI from '../../common';
import { useNavigate } from 'react-router-dom';
import verifyContext from '../context/createcontext';
const Login = () => {
    const [showpassword,setshowpassword]=useState(false);
    const {veriUser}=useContext(verifyContext);
      console.log("veriUser",veriUser);
    const navigate=useNavigate();
         function passwordhandler()
         {      
            setshowpassword(!showpassword);
         }
    const [data,setdata]=useState({email:"",password:""});
       const handlechange=(e)=>
        {
            const{value,name}=e.target;
             setdata((prev)=>{
            return{
                ...prev,[name]:value
             }
            }
             )
        }
        console.log(data);
        const handleSubmit=async(e)=>
            {
                e.preventDefault();
                try{
                const response=await axios.post(summaryAPI.login.url,data);
                 if(response&&response.status===200){
                 localStorage.setItem("token",response.data.token)
                 console.log(veriUser);
                 veriUser();
                  navigate('/');
                toast.success(response.data.message);
                 }
                }
                catch(err)
                {    
                       if(err.response)
                        {
                          toast.error(err.response.data.message);
                        }
                        else
                        {
                           toast.error("server error");
                        }
                        
                }

            }
        
    
  return (
    <div className='bg-red-900 p-4 mx-auto my-2 w-full max-w-sm rounded-lg'>
      <div className='w-16 mx-auto'>
      <img src={login} alt =" " className='rounded-full'></img>
      </div>
      <form className='flex flex-col gap-y-5' onSubmit={handleSubmit}>
        
        <div>
            <label htmlFor="email">Gmail</label>
            <div><input id ="email" type='email'value={data.email} name='email' placeholder="Enter Gmail" onChange={handlechange}
             className='w-full text-center px-2 py-1 rounded-lg text-black bg-teal-100 outline-none'></input></div>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <div className='flex'>
            <input type={showpassword?"text":"password"} name='password' id='password' value={data.password}   placeholder="Enter Password" onChange={handlechange}
             className='w-full text-center px-2 py-1  text-black bg-teal-100 rounded-l-lg outline-none '></input>
            <div className='bg-teal-100 text-black text-center text-lg rounded-r-lg p-2' onClick={passwordhandler}>
            {
                showpassword?
                <FaEye/>:<FaEyeSlash/>
            }
                </div> </div>
            </div>
           
          <div className='flex justify-end items-center '>
          <Link to="/forgotpassword" className='hover:text-green-200 underline'>
           forgotpassword
           </Link>
          </div>
          
        <div className=' flex items-center justify-center'>
        <button className='hover:bg-blue-600'>Login</button>
        </div>
      </form>
      <div className='mt-3'>
       <p>do not have account ?
       <Link to={"/signup"} className='hover:text-green-300'>  signup</Link></p>
      </div>
    </div>
  )
}

export default Login
