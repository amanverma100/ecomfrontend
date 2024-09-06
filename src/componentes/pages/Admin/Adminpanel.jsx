import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { IoReorderThreeOutline,IoCloseSharp} from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const Adminpanel = () => {
    const data=useSelector((state)=>state.user?.user)
    const[isShrink,setisShtink]=useState(true);
      const hiddenset={
       false:'flex fixed overflow-hidden z-10 text-gray-200 h-[100vh] top-[0] w-[10rem]  bg-gradient-to-b from-pink-600 shadow-lg to-purple-600 transition-width linear transition-all duration-300',
        true:'flex fixed overflow-hidden text-gray-200 h-[100vh] top-[0] w-[2.8rem] bg-gradient-to-b from-purple-700 shadow-lg to-indigo-900  transition-all transition-width ease-in duration-300'
      } 
      
      const widthset={
         false:'relative w-[10.4rem] z-[20] lg:w-[9.6rem] transition-width ease-out duration-1000',
         true:'relative w-[2rem] lg:w-[1.5rem] z-[20] transition-width ease-in duration-300'
      }
      const visbilityset={
        true:'opacity-0 absolute items-center flex-col flex top-12 gap-0.5 left-[2rem] transition-opacity ease-out duration-300',
        false:'opacity-100 absolute flex top-12 items-center flex-col gap-0.5 left-[2rem] transition-opacity ease-in duration-300'
      }
      const lowervisibility={
        false:` opacity-0 absolute overflow-hidden bottom-3 left-[.2rem] w-10 h-10   rounded-full bg-blue-400 transition-opacity ease-out duration-300`,
        true:`  opacity-100 absolute overflow-hidden bottom-3 left-[.2rem] w-10 h-10 rounded-full bg-blue-400 transition-opacity ease-in duration-300`
      }
      const closeSideBarHandler = ()=>
        {
            setisShtink(!isShrink);
        }
  return (
      
      <div className=' w-full h-[calc(100vh-8rem)] bg-red-600 hidden md:flex'>
      <div className={`${widthset[isShrink]}`}>
      <div className={`${hiddenset[isShrink]}`}>
      <div className='w-full  h-full relative flex text-xl px-2 py-3 flex-col justify-center gap-10'>
     {
      
     isShrink?
     <IoReorderThreeOutline className='absolute top-5 text-3xl cursor-pointer font-bold ' onClick={closeSideBarHandler}/>
     :<div className='self-end items-top absolute top-4 right-0 cursor-pointer text-3xl pr-2' onClick={closeSideBarHandler}><IoCloseSharp/></div>
     
     }
     <div className={`${visbilityset[isShrink]}`}>
     {!data?.profilepic ?
       <div className="w-24 h-24  rounded-full bg-blue-800 overflow-hidden text-center font-bold text-4xl pt-6 text-yellow-400 capitalize">{data?.Name.charAt(0)}</div>
       :
       <div className='w-24 h-24 rounded-full overflow-hidden'><img src={data?.profilepic} className='w-full h-full'></img></div>
     }
    <div className='capitalize text-sm font-semibold'>{data?.Name}</div>
    </div>
        <div className='flex  items-center hover:bg-purple-700 '><Link to={'/'} className=' pl-1 pr-4'><AiFillHome className='hover:text-yellow-100 shadow-md'/></Link>
        <div><Link className='pr-12' to='/'> Home</Link></div></div>
        <div className='flex items-center hover:bg-purple-700'><Link className='pl-1 pr-4' to={'users'}><FaUsers className='hover:text-yellow-100 shadow-md'/></Link>
        <div><Link className='pr-12' to='admin/users'>Users</Link></div></div>
        <div className='flex   items-center hover:bg-purple-700'><Link className='pl-1 pr-4' to={'products'}><FaProductHunt className='hover:text-yellow-100 shadow-md'/></Link>
       <div> <Link className='pr-8' to={'products'}>products</Link></div></div> 
        
    
    <div className={`${lowervisibility[isShrink]}`}>
    {!data?.profilepic ?
       <div className="w-full h-full border rounded-full bg-blue-800 overflow-hidden text-center font-bold text-xl pt-1 text-yellow-400 capitalize">{data?.Name.charAt(0)}</div>
       :
       <div className='w-full h-full   rounded-full overflow-hidden'><img src={data?.profilepic} className='w-full h-full'></img></div>
     }
    </div>
    </div>
      
    </div>
    </div>
    <div className='w-full bg-gray-700 pl-5 h-[calc(100vh-8rem)] overflow-y-auto  pb-12 '><Outlet/></div>
    </div>
    
  )
}

export default Adminpanel
