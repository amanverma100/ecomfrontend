import React from 'react'
import UploadProduct from './UploadProduct'
import { useState } from 'react'
import axios from 'axios'
import summaryAPI from '../../../common'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import ProductModify from './ProductModify'
const Products = () => {
  const [closeUpload,setCloseUpload]=useState(false);
  const [productsData,setProductsData]=useState([]);
  const [modifyProductData,setModifyProductData]=useState([]);
  const [closedModify,setCloseModify]=useState(false);
   const productDataFun=async()=>
    {
           try{
               const response=await axios.get(summaryAPI.getproduct.url);
                  if(response?.data?.success===true)
                    {   
                       setProductsData(response.data.productdata);
  
                    }
           }  
           catch(error){
               if(error?.response?.data?.success===false)
                {
                  toast.error(error.response.data.message);
                }
           }    
    }
    useEffect(()=>
    {
        productDataFun();
    },[])
  return (
    <>
    <div className='flex h-12 px-4 py-1 z-10 bg-red-500 justify-between text-black  sticky top-0 left-0 shadow-lg'>
    <div className='text-white text-2xl'>Product show here</div>
    <div><button className='bg-gradient-to-l from-pink-500 to-purple-500 transition-all hover:from-pink-600 hover:to-purple-600' onClick={()=>setCloseUpload(true)}>Upload</button></div>
    </div>
    <div className='flex flex-wrap px-2 py-2 gap-3'> 
    { productsData.map((product,index)=> 
    {
    return(
    <div className=' bg-white group  relative h-[12rem] w-[10rem] shadow-sm rounded-md hover:shadow-lg  hover:scale-105'>
    <img className='object-scale-down mx-auto my-auto  h-[8rem]' src={product.productImage[0]}></img>
    <div className=' px-auto capitalize text-md  text-center text-slate-600'>{product.productName}</div> 
    <MdModeEditOutline className='absolute bottom-1 right-1 h-8 w-8 cursor-pointer text-black hover:bg-pink-600  rounded-full transition-all  hidden group-hover:block' onClick={()=>
      {
        setModifyProductData(product);
         setCloseModify(true);
        }}/>
      <div className='flex gap-2'>
     <div className='text-red-600'>{product.price}</div>
     <div className='text-red-600 '>{product.discountedprice}</div>
     </div>
    </div>
     
      )
    }  )  
     }
    {closedModify&&<ProductModify modifyeffect={productDataFun} initialData={modifyProductData} onclose={()=>setCloseModify(false)}/>}
    </div>
    {closeUpload&&<UploadProduct modifyeffect={productDataFun} onclose={()=>setCloseUpload(false)}/>}
    </>
  )
}

export default Products
