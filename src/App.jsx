
import './App.css'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import summaryAPI from './common';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import verifyContext from './componentes/context/createcontext';
import {Provider} from 'react-redux';
import store from './store';
import { useDispatch } from 'react-redux';
import { setUserDetail } from './slice/userSlice';
function App() {
  const dispatch=useDispatch();
 const veriUser=async ()=>
    {  
     const token=localStorage.getItem("token");
      try{
        const response= await axios.get(summaryAPI.verified.url,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
        });
          if(response&&response.data.sucess===true)
            {  let newdata=response.data.message;
              console.log(response.data.message);
              dispatch(setUserDetail(newdata));  
            }
         else
         {
          toast.error(response.data.message);
         }
          
      }
      catch(error)
      {           
           const seterr=error.response?.data?.message||"verification failed";
           console.log(seterr);
      }
      
    }
    useEffect(()=>{
      veriUser();
    },[]);
  return (
    <>
    
    <verifyContext.Provider value={{veriUser}}>
     <Header/>
     <main className='min-h-[calc(100vh-8rem)] pt-16  bg-yellow-600'>
      <Outlet></Outlet>
      </main>
      <div><Footer/></div>
      </verifyContext.Provider>
    </>
  )
}

export default App
