import React from 'react'
import axios from 'axios'
import summaryAPI from '../../../common'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const CategoryItems = () => {
    const [getCatProduct,setCatProduct]=useState([]);
    const[getLoading,setLoading]=useState(true);

  const categoryProduct=async()=>
      {
          try{
           
          setLoading(true);
          const response=await axios.get(summaryAPI.categoryproduct.url);
          if(response?.data?.success===true)
              {   
               setCatProduct(response?.data?.categoryproduct);
                console.log("category",response.data?.categoryproduct);
                   
              }
           setLoading(false);
          }
          catch(error)
          {     
               if(error?.response?.status===404)
                 {
                   toast.error(error?.response?.data?.message);
                 }
                 
               
          }
      }

useEffect(()=>{
categoryProduct();
} ,[])
const loading_display=new Array(10).fill(null);
return (
  <div className=''> 
    <div className='flex rounded-sm shadow-md items-center  overflow-x-scroll gap-2 scrollbardisplaynone gap-4 w-full  flex-row px-1 py-1 bg-white h-24 md:h-28'> 
    {
      getLoading?(
           loading_display.map((element,index)=>
        {
            return(
               <div className='p-2 h-16 md:h-20 cursor-pointer  aspect-square bg-slate-100 rounded-full'key={index}></div>   
            )
        })
      )
      :
      (getCatProduct.map((product,index)=>{
       return(
          <Link  to={`/categoryproduct/${product.category}`} key={product?.category+product.index}>
          <div className='p-2 h-16 md:h-20 cursor-pointer aspect-square bg-slate-100 rounded-full'>
          <img className='w-full h-full transition-all object-contain hover:scale-105'  src={product?.productImage[0]}></img>
          </div>
          <div className='text-gray-700 text-center text-sm capitalize'>{product?.category}</div>
          </Link>
)
      }
  )
)
   }
   </div>
 </div>
)
}

export default CategoryItems
