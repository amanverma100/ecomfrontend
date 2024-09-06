import React from 'react'
import login from './../../assets/login/login.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Imagetobase64 from '../../helper/Imagetobase64';
import axios from 'axios';
import summaryAPI from '../../../src/common'
import { useContext } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dpupload from '../../helper/Dpupload';
const Signup = () => {
    const [showpassword,setshowpassword]=useState(false);
    const[showcpassword,setshowcpassword]=useState(false);
    const navigate=useNavigate();
    function passwordhandler()
    {      
       setshowpassword(!showpassword);
    }
    function cpasswordhandler()
    {      
       setshowcpassword(!showcpassword);
    }

const [data,setdata]=useState({Name:"",email:"",password:"",confirmpassword:"",profilepic:""});
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
   const imageHandler= async(e)=>
    {
            const image= e.target.files[0];
            const uploadimage=await Dpupload(image);
          // const dp = await Imagetobase64(image);
             console.log("base64",uploadimage.url);
             setdata((prev)=>
            {
               return {
                ...prev,profilepic:uploadimage.url
               } ;
            });
    }
     const handleSubmit= async(e)=>
       {
           e.preventDefault();
           if(data.password===data.confirmpassword)
            {
          try{
          const response=await axios.post(summaryAPI.signup.url,data);
          toast.success(response.data.message);
            navigate("/login");
          }
          catch(err){
                  if(err.response&&err.response.status===409)
                    {
                        toast.error(err.response.data.message);
                    }
                    else
                    {
                        toast.error("Please try after some time");
                    }
          }
        }
        else
        {    
          toast.warning('password did not match');
        }
       }
return (
<div className='bg-slate-500 p-4 mx-auto my-2 w-full max-w-sm rounded-lg'>
 <div className='w-16 aspect-square mx-auto relative overflow-hidden'>
 <img src={(data.profilepic=="")?login:data.profilepic} className='rounded-full w-full h-full'></img>
      <form>
        <label className=''>
        <div className={(data.profilepic=="")?"bg-yellow-100 text-xs text-black font-bold font-serif pb-1 overflow-hidden  cursor-pointer w-full text-center absolute bottom-0 rounded-b-full opacity-70"
            :"bg-yellow-100 text-xs text-black font-bold font-serif pb-1 overflow-hidden  cursor-pointer w-full text-center absolute bottom-0 rounded-b-full opacity-10 hover:opacity-50"
        }>
         upload photo
          </div>
           <input type='file' name='profilepic' onChange={imageHandler} className='h-full hidden'/>
        </label>
    </form>
    
 </div>
 <form className='flex flex-col gap-y-5' onSubmit={handleSubmit}>
 <div>
       <label htmlFor="Name"    >Name</label>
       <div><input required type='text' name='Name' id='Name' value={data.Name} placeholder="Enter Name" onChange={handlechange}
        className='w-full text-center px-2 py-1 rounded-lg text-black bg-teal-100 outline-none'></input></div>
</div>
   <div>
       <label htmlFor="email">Gmail</label>
       <div><input type='email' name='email'id='email' value={data.email} required placeholder="Enter Gmail" onChange={handlechange}
        className='w-full text-center px-2 py-1 rounded-lg text-black bg-teal-100 outline-none'></input></div>
   </div>
   <div>
       <label htmlFor="password">Password</label>
       <div className='flex'>
       <input type={showpassword?"text":"password"} id='password' name='password' value={data.password} required placeholder="Enter Password" onChange={handlechange}
        className='w-full text-center px-2 py-1  text-black bg-teal-100 rounded-l-lg outline-none '></input>
       <div className='bg-teal-100 text-black text-center text-lg rounded-r-lg p-2' onClick={passwordhandler}>
       {
           showpassword?
           <FaEye/>:<FaEyeSlash/>
       }
           </div> </div>
       </div>

       <div>
       <label htmlFor="confirmpassword">Confirm password</label>
       <div className='flex'>
       <input type={showcpassword?"text":"password"}id='confirmpassword' name='confirmpassword' value={data.confirmpassword} required placeholder="Enter Password" onChange={handlechange}
        className='w-full text-center px-2 py-1  text-black bg-teal-100 rounded-l-lg outline-none '></input>
       <div className='bg-teal-100 text-black text-center text-lg rounded-r-lg p-2' onClick={cpasswordhandler}>
       {
           showcpassword?
           <FaEye/>:<FaEyeSlash/>
       }
           </div> </div>
       </div> 
   <div className=' flex items-center justify-center'>
   <button className='hover:bg-blue-600'>Signup</button>
   </div>
 </form>
 <div className='my-3'>
    <p>already have account ? <Link to="/login" className='hover:text-green-300'>login</Link></p>
 </div>

</div>
)
}

export default Signup
