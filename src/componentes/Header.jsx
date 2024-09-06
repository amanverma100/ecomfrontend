import React from 'react'
import Logo from './Logo'
import { TfiSearch } from "react-icons/tfi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import login from '../assets/login/login.gif';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import { setUserDetail } from '../slice/userSlice';
import countaddtocart from '../helper/countaddtocart';
const Header = () => {
const dispatch=useDispatch();
const data=useSelector(state=>state.user);
const [panel,setPanel]=useState(false);

const navigate=useNavigate();
const  firstletter=data.user?.Name?.charAt(0).toUpperCase();
const image=data.user?.profilepic;
console.log("headerinfo",data);
  function handlelogout()
{

      localStorage.removeItem("token");
           dispatch(setUserDetail(null));
          navigate("/")  
      toast.success("logout sucessfully");  
}
  return (
      <div className='h-16 fixed w-full z-[15] shadow-sm pl-9 flex justify-between items-center px-6 bg-gradient-to-r from-blue-500 to-green-400 shadow-lg '>
        <div>
          <Link to="/">
        <Logo/>
        </Link>
        </div>
        <div className='hidden lg:flex  w-full max-w-sm h-8'>
          <div className='w-full focus-within:shadow-md '>
          <input type='text' placeholder='search product here' className='rounded-l-lg bg-white text-center w-full h-8 px-2 text-black outline-none'></input>
          </div>
          <div className='w-16 bg-red-600 text-lg text-sky-600 h-8 rounded-r-lg flex items-center justify-center '>
          <TfiSearch className=''/>
          </div>
        </div>
      
      <div className='flex items-center gap-5 justify-center'>
       <div className='flex flex-col cursor-pointer relative group items-center'onClick={()=>setPanel(val=>!val)}>
       {
       !data?.user?._id?
        <div>
         <FaRegUserCircle className='text-4xl text-gray-200'/>
        </div> 
         :
        !image?
       <div className="w-10 h-10 rounded-full bg-blue-800 overflow-hidden text-center font-bold text-xl pt-1 text-yellow-400">{firstletter}</div>
       :
       <div className='w-10 h-10 rounded-full overflow-hidden'><img src={image}  className='w-full h-full'></img></div>
      }

      {data?.user?._id && data?.user?.role==="Admin"&&panel&&
        <div className='w-28 p-2 top-14 rounded-t-sm z-20 bg-gradient-to-b from-pink-600 to-purple-600 shadow-sm h-fit hidden md:block absolute'>
        <nav className='hover:bg-pink-400 p-1 '><Link className={'block'} to='/admin/users'>Admin</Link></nav>
        <nav className='hover:bg-pink-400 p-1 '>detail</nav>
        <nav className='hover:bg-pink-400 p-1'>Address</nav>
        </div>
      }
      </div>  
        
          <div className='relative'>
          <FaShoppingCart className='text-3xl text-blue-600'/>
          {<div className='h-5 w-5 bg-red-600 rounded-full absolute text-center bottom-5 left-4'>
          
            
            
          
            </div>

          }
          </div>
         {
         !data?.user?._id ?<Link to="/login">
          <div className='bg-red-500 px-3 py-1 rounded-2xl hover:bg-red-600'>
          login
          </div>
          </Link>
          :
          <div className='bg-red-500 px-3 py-1 rounded-2xl cursor-pointer hover:bg-red-600'onClick={handlelogout}>
          logout</div>
          }
        </div>
   
      </div>
  )
}
export default Header
