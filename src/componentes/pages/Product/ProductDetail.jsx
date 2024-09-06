import React, { useCallback } from 'react';
import axios from 'axios';
import summaryAPI from '../../../common';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryWise from './CategoryWise';
import RecommProduct from './RecommProduct';
const ProductDetail = () => {
     const params=useParams(); 
    const [isloading,setloading]=useState(false);
    
    const [getdata,setdata]=useState(
       { productName:"",
         productBrand:"",
         category:"",
         productImage:[],
         description:"",
         price:"",
         discountedprice:"", 
    }
    );
    const [getimg,setimg]=useState("");
    const [getcor,setcor]=useState(
      {
        x:0,
        y:0
      }
    )
    const [zoomOn,SetzoomOn]=useState(false);
    const handlezoomImg=useCallback((e)=>
      {
             const {left,top,width,height}=e.target.getBoundingClientRect();
             console.log("coord",left,top,width,height);
             const x=(e.clientX-left)/width;
             const y=(e.clientY-top)/height;
             
             setcor({x,y})
             console.log("value",x,y)
      },[getcor])
     const productid=params?.id;
     const fetchdetail=async()=>
        {
             
            try{
             setloading(true);
            const response=await axios.post(summaryAPI.productdetail.url,
                {
                    id:productid
                }
            );
             if(response?.data?.success===true)
                {
                   setdata(response?.data?.productdetail);
                   setimg(response?.data?.productdetail?.productImage[0]);
                   setloading(false);
                }
             
            }
            catch(error)
            {
     
            }
        }
        console.log("productdetail",getdata);
        console.log("param",params);
        useEffect(()=>
            {
                fetchdetail();
            }
        ,[]);
        const loadContainer=new Array(5).fill(null);
       
            

  return (
    <div className='min-h-[calc(100vh-8rem)] overflow-hidden bg-blue-100'>
    <div className='flex flex-col md:flex-row gap-2 m-[1px] mx-auto mb-1 items-center'>
    { !isloading?
    <div className='flex md:h-[15rem] gap-2 overflow-y-auto md:px-2 px-auto py-2 md:py-2 scrollbardisplaynone  h-[100px] md:w-[90px] items-center w-full bg-gray-200 rounded-sm  shadow md:flex-col flex-row  '>
    { getdata?.productImage.map((element,index)=>{
     return (
     element&& <div className='w-20 h-20 p-2 bg-white rounded-md shadow-blue-500 shadow cursor-pointer' onMouseEnter={()=>setimg(element)}>
     <img className=' object-scale-down w-full h-full  mix-blend-multiply ' src={element}></img>
     </div>
     )
 } )
  }
    </div>
    :
    <div className=' flex md:h-[10rem] gap-2 overflow-y-auto md:px-2 px-auto py-2 md:py-2 scrollbardisplaynone  h-[100px] md:w-[90px] items-center w-full bg-blue-200 md:flex-col flex-row '>
    { loadContainer.map((element,index)=>{
     return (
     <div className='min-w-20 min-h-20 p-2 bg-white rounded-md shadow-blue-500 shadow'>
     </div>
     )
 } )
  }
    </div>
}

<div className='w-full flex-col sm:flex-row m-1 gap-2 flex mx-auto items-center'>
    <div className='text-white  relative sm:basis-1/2 max-w-[350px] sm:max-w-auto min-w-[350px] aspect-square max-h-[400px] bg-gray-100 rounded shadow sm:w-full'onMouseEnter={()=>SetzoomOn(true)} onMouseLeave={()=>SetzoomOn(false)}>
    <img src={getimg } className='object-scale-down w-full h-full m-1 p-10 mix-blend-multiply' onMouseMove={handlezoomImg} ></img>
    {zoomOn &&<div className=' lg:block hidden p-22 absolute min-w-[400px] z-10 min-h-[400px]   left-[400px] right-0  top-[40px]'>
       <div className='w-[320px] h-[320px]  scale-125  bg-gray-200 overflow-hidden mix-blend-multiply' style={{backgroundImage:`url(${getimg})`, backgroundRepeat:'no-repeat',backgroundPosition:`${getcor.x*100}% ${getcor.y*100}%`}}>
         
         
      </div>
     </div>
}
    </div>
   <div className='text-white sm:basis-1/2 md:max-w-[330px] p-2  min-w-[350px] lg:max-w-auto h-auto rounded  sm:w-full'>
   <div className='mt-2 text-black md:text-md font-bold text-pink-800 inline bg-yellow-400 py-1 px-2 rounded-md ' >{getdata?.productBrand}</div>
   <h1 className='text-blue-800 md:text-2xl text-xl'>{getdata?.productName}</h1>
   <p className='mt-2 text-black capitalize'>{getdata?.description}</p>
   <del className='mt-2 text-green-600 '>{getdata?.price}</del> <span className='text-red-600'>{getdata?.discountedprice}</span>
   <div className='mt-4  '> <span className='mr-4'><button className='border-none shadow shadow-purple-500'>Buy</button></span><span><button className='border-none shadow shadow-purple-500'>Add To Cart</button></span></div></div>
  </div>
    </div>
    {
  getdata.category&& <RecommProduct catg={getdata?.category} heading="Recommended product" onClick={()=>fetchdetail()}/>
    }
    </div>
  )
}

export default ProductDetail
