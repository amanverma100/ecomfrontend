import React from 'react';
import axios from 'axios';
import summaryAPI from '../../../common';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from "moment"
import { MdModeEditOutline } from "react-icons/md";
import Updateuser from './Updateuser';
const Users = () => {
  const [getusersData,setusersData]=useState([]);
  const[userRoleclose,setuserRoleclose]=useState(false);
  const [getUpdateUserdata,setUpdateUserdata]=useState({
    Name:"",
    email:"",
    role:"",
    _id :"",
   });
   function closeroleHandler()
    {
         setuserRoleclose(!userRoleclose);
    } 
   const token=localStorage.getItem('token');
   const usersData=async()=>
        {
            try{
              const response=await axios.get(summaryAPI.users.url,
                {
                    headers:
                    {
                    'Authorization':`Bearer ${token}`
                    }
                }
              )
            if(response.data.sucess==true)
             {
              const data=response.data.data;
              setusersData(data);
            }
            }
            catch(error)
            {
               console.log(error?.response?.data?.message);
            }
          
        }
      
        useEffect(()=>
        {
          usersData();
        },[]);




  return (
    <>
     <table className='w-full bg-slate-800'>
      <thead className='text-black bg-gray-500 sticky top-0 shadow-lg '>
       <th className='py-2'>Sr.No</th>
       <th></th>
       <th className=''>Name</th>
       <th>Email</th>
       <th>Role</th>
       <th>CreatedAt</th>
       <th>Action</th>
      </thead>
      <tbody className='text-center text-[0.7rem] lg:text-[1rem]'>
       { getusersData.map((data,index) => (
        <tr className='hover:bg-gray-700 hover:shadow-2xl' key={index}>
        <td className='w-[6%] py-4 shadow-md'>{index+1}</td>
        <td className='w-[8%] py-4 shadow-md '>
        <div className='w-12 h-12 rounded-full bg-white ml-10 overflow-hidden'>
        {data?.profilepic?<img className='w-full h-full' src={data?.profilepic}></img>
        :
        <div className="w-full h-full  rounded-full bg-blue-800 border text-center font-bold text-xl pt-1 text-yellow-400 capitalize">{data?.Name.charAt(0)}</div>
        }     
</div>
        </td>
        <td className=' w-[20%] py-4 shadow-md'>{data?.Name}</td>
        <td className='w-[34%] py-4 shadow-md'>{data?.email}</td>
        <td className=' w-[12%] py-4 shadow-md'>{data?.role}</td>
        <td className=' w-[15%] py-4 shadow-md'>{moment(data?.createdAt).format('LL')}</td>
        <td className=' w-[5%] py-4 shadow-md  '><MdModeEditOutline className='mx-auto text-2xl cursor-pointer hover:text-yellow-300' onClick={()=>{setUpdateUserdata(data),setuserRoleclose(true)}}/></td>
        </tr>
       )
        )
       }
      </tbody>
     </table>
    {userRoleclose&&<Updateuser Name={getUpdateUserdata.Name} _id={getUpdateUserdata._id} email={getUpdateUserdata.email} role={getUpdateUserdata.role} calldata={usersData} closeRoleChange={closeroleHandler} image={getUpdateUserdata?.profilepic}/>}
    </>
  )
}

export default Users;
