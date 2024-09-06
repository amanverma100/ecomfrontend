import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import userRole from '../../../common/Roles';
import { useState } from 'react';
import axios from 'axios';
import summaryAPI from '../../../common';
import {toast} from 'react-toastify';
const Updateuser = ({closeRoleChange,Name,email,role,_id,calldata,image}) => {
    const[getroleoption,setroleoption]=useState(role);
       function optionhandler(e)
       {
       setroleoption(e.target.value);
       }
       
       const updateUserRole=async()=>
       {
            try{
               const token=localStorage.getItem('token');
               console.log("updatetoken",token);
               console.log("id",_id);
               const response=await axios.post(summaryAPI.updateuser.url,{
                role:getroleoption,
                Uid:_id
               },
              {
                headers:
                {
                  'Authorization':`Bearer ${token}`
                }
                }
              )
              if(response.data.success==true)
                {
                      
                    toast.success(response.data.message);
                    closeRoleChange();
                    calldata();
                    
                }
            }
            catch(error)
            {       
                  if(error.response?.data?.success===false)
                    {
                    toast.error(error.response.data.message);
                    }
                  else
                  {
                    toast.error("network or internal server error");
                  }
            }
       }
    
     
       return (
        <div className=' flex items-center z-[30] justify-center top-0 left-0 bottom-0  right-0 z-12 fixed opacity-95 bg-slate-200'>
        <div className='bg-slate-700 rounded-lg shadow-lg z-13 w-[80vw] pt-6 p-4 max-w-[21rem] aspect-[9/10] '>
        <IoCloseSharp className='ml-auto cursor-pointer text-3xl hover:text-yellow-100' onClick={closeRoleChange}/>
        <div className='text-center text-xl '>Update Role</div>
        <hr className='max-w-[9rem] w-[33%] mx-auto mt-2 border-1  shadow-xl border-gray-500'></hr>
        <div className='flex items-center  gap-8 mt-6'>
            <div className="overflow-hidden w-16 h-16 rounded-full bg-white">
                {image?<img className='w-full h-full' src={image}>
                </img>
                :
                <div className='w-full h-full capitalize bg-blue-600 text-yellow-600 pt-3 text-2xl font-semibold text-center'>{Name.charAt(0)}</div>
                  }
            </div>
            <div className='capitalize text-xl'>{Name}</div>
        </div>
        <div className='text-md my-3'>{email}</div>
        <div className='flex items-center justify-between text-xl mt-6'>
            <div className='flex items-center gap-5 '>
            <div className='text-xl'>Role</div>
            <div className='text-xl font-semibold bg-gradient-to-l from-pink-600 to-purple-500 bg-clip-text text-transparent '>{getroleoption}</div>
            </div>
            
             <select className='outline-none bg-slate-600 text-base w-20 rounded-sm  ' onChange={optionhandler} value={getroleoption}>
             {    
            Object.values(userRole).map((value,index)=>
              (

             <option className='' value={value} key={index}>{value}</option>
             )
            )
           
            }
           </select>
        </div >
        <button className=' mx-24 border-0 px-1 mt-10  py-1 border-md bg-gradient-to-l from-pink-600 to-purple-500 hover:to-voilet-500 hover:from-purple-500 hover:from-voilet-500 transition-all duration-500 shadow-lg ' onClick={updateUserRole}>Submit</button>
        </div>
        </div>
    
  )
}

export default Updateuser
