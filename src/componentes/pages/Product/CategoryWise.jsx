import React from 'react'
import { useState } from 'react'
import summaryAPI from '../../../common';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { FaRupeeSign } from "react-icons/fa";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addtocart from '../../../helper/addtocart';

const CategoryWise = ({catg,heading}) => {
  const [getcat,setcat]=useState(catg);
  const [getloading,setloading]=useState(true);
  const [getCatData,setCatData]= useState([]);
  const [transX,setTransX]=useState(0);
    const fetchcategoryproduct= async()=>
      {    
        try{
          setloading(true);
         const response= await axios.post(summaryAPI.categorywise.url,{
          category:getcat
         });
          const data=response?.data?.catWiseData;
          if(response?.data?.success===true)
          setCatData(response?.data?.catWiseData);
         setloading(false);

      }
      catch(error)
      {
           if(error.response?.data?.message)
            {
              toast.error(error.response.data.message);
            }
      }    
      }
      function leftShift()
     {      
          if(transX<getCatData.length-1)
            {    
                setTransX((prev)=>prev+1);
            }
            
     }
     function rightShift ()
     {
        if(transX>0)
            {
              setTransX((prev)=>prev-1);
            }
     }
      useEffect(()=>
      {
      fetchcategoryproduct();
      },[])
   const loadinglist=new Array(10).fill(null);
  return (
    <div className='bg-white md:py-4 md:px-4 mb-2 rounded-sm'>
    <h2 className='text-black md:pl-4 pl-1 md:text-xl text-[16px] capitalize md:pb-2 pb-1'>{heading}</h2>
    <div className='flex relative items-center md:px-[50px] overflow-x-scroll md:overflow-hidden gap-2  scrollbardisplaynone md:gap-4 gap:2 w-full flex-row  py-1  h-[185px] md:h-[310px]'>
      {
         getloading?(
          loadinglist.map((element,index)=>
       {
           return(
              <div className=' min-h-[150px] md:min-h-[250px] min-w-[120px] md:min-w-[200px] rounded-md cursor-pointer  bg-gray-100 'key={index}></div>   
           )
       })
     ):
     (
      getCatData?.map((element,index)=>
   {          const temp=element?._id;
       return(
       <Link to={`/productdetail/${element?._id}`}> <div className=' h-[140px]  md:h-[300px]  w-[180px] px-1 py-2  md:w-[250px] rounded-md   border-gray-400 border-dashed border-[1px]'key={index} style={{transform:`translateX(-${transX*100}%)`}}>
            <img src={element?.productImage[0]} className='md:h-[70%] h-[70%] hover:scale-105 min-w-[120px] md:min-w-[210px] w-full object-contain p-2' ></img>
            <div className=' truncate px-1  md:px-2  text-black text-center text-[10px] md:text-[12px] '>{element?.productName}</div>
            <div className='flex items-center gap-2 pl-2 pt-1'>
            <div className=' truncate    flex  line-through text-green-600  text-[10px] md:text-[12px] '><FaRupeeSign/>{element?.price}</div>
            <div className=' truncate   flex   text-red-600 text-[10px] md:text-[12px] '><FaRupeeSign/>{element?.discountedprice}</div>
            </div>
          
            <div className='h-[18px] md:h-[30px] md:my-4  my-2'><button className='rounded-md border-0 text-[12px] h-[18px] md:h-[30px] md:text-[14px] w-full  bg-red-600 ' onClick={(e,element)=>addtocart(e,temp)}>Add to Cart</button></div>
            </div>
            </Link>
            
       )
   })
 )
      }
     <FaChevronLeft className='text-[2vw] cursor-pointer h-2vw w-2vw hidden md:block rounded-full hover:bg-gray-800 text-red-600 absolute top-[48%]  mleft-1 left-0 ' onClick={leftShift}/>
<FaChevronRight className='text-[2vw] h-2vw w-2vw hidden md:block rounded-full hover:bg-gray-800  cursor-pointer text-red-600 absolute top-[48%]  right-1 right-0 ' onClick={rightShift}/>
    </div>
    </div>
  )
}

export default CategoryWise
