import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useState } from 'react'
import ProductCategory from '../../../helper/ProductCategory'
import { IoMdCloudUpload } from "react-icons/io";
import imageupload from '../../../helper/imageupload';
import FullScrUplProduct from './FullScrUplProduct';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import summaryAPI from '../../../common';
import { toast } from 'react-toastify';
const UploadProduct = ({onclose,modifyeffect}) => {
    const [data,setData]=useState(
        {
            productName:"",
            productBrand:"",
            category:"",
            productImage:[],
            description:"",
            price:"",
            discountedprice:"",

        }
        
      
    );
    const [getFullImage,setFullImage]=useState(false);
    const [getUrl,setUrl]=useState("");

    console.log("product",data);
    function setProductData(e){
        
        const{name,value}=e.target;
        setData((prev)=>
            {
                return{
               ...prev,[name]:value
                }
            }
            
        )

    }
    const productimageuploadhandler=async(e)=>
    {     
        const image=e.target.files[0];
        const uploadimage=await imageupload(image);
           setData((prev)=>
            {
                return{
                    ...prev,productImage:[...prev.productImage,uploadimage.url]
                }
            }
           )
    }
    async function submitProduct(e)
    {   const token=localStorage.getItem("token");
           e.preventDefault();
           try{
              const response=await axios.post(summaryAPI.uploadproduct.url,data,
                {
                  headers:
                  {
                    'Authorization':`Bearer ${token}`
                  }
                }
              )
              if(response?.data?.success===true)
                {
                    toast.success(response.data.message);
                    onclose();
                    modifyeffect();
                }
                else
                {
                    toast.error(response?.data?.message);
                }
         }
         catch(error)
         {
             if(error?.response?.data?.success===false)
                {
                   toast.error(error.response.data.message);
                }
                else
                {
                    toast.error("upload product failed");
                }
         }

    }
    function delteteProducthandler(index)
    {
        const newdata=[...data.productImage];
        newdata.splice(index,1);
        setData((prev)=>
            {
            return{
            ...prev,productImage:[...newdata]
            }
        }
         )
    }
  return (
      <div className=' flex items-center z-[30] justify-center top-0 left-0 bottom-0 right-0 z-12 fixed opacity-95 bg-slate-200'>
      <div className='bg-slate-700 rounded-lg shadow-lg z-13 w-[80vw] pt-6 p-4 max-w-[30rem] aspect-[9/10] overflow-y-hidden'>
     
     <IoCloseSharp className='ml-auto cursor-pointer text-3xl hover:text-yellow-100' onClick={onclose}/>
     
     <div className='text-center text-xl '>Upload Product</div>
     <hr className='max-w-[9rem] w-[33%] mx-auto mt-2 border-1  shadow-xl border-gray-500'></hr> 

     <form className='grid gap-2  overflow-y-scroll h-[70%]'>
     <label htmlFor='ProductName' className='text-xl mt-2'>Product Name</label>
     <input type='text' id='ProductName' name='productName' value={data.productName} className='w-full h-8  text-black bg-slate-500 px-2 rounded-sm outline-none  placeholder-gray-800 text-xl' placeholder='Enter product name'onChange={setProductData}  ></input> 
     <label htmlFor='ProductBrand' className='text-xl'>Product Brand</label>
     <input type='text' id='ProductBrand' name='productBrand' value={data.productBrand} className='w-full h-8 text-black placeholder-gray-800 bg-slate-500 px-2 rounded-sm outline-none text-xl' placeholder="Enter Product Brand"onChange={setProductData}  ></input> 
     <label htmlFor='Category'  className='text-xl mt-2 overflow-auto'>Category</label>
     <select  id='Category' name='category' value={data.category} className='w-[10rem] h-8 bg-slate-500 px-2 outline-none text-black rounded-sm text-xl' onChange={setProductData} >
        {
            ProductCategory.map( (object,index)=>
                    
         <option  value={object.value} id={object.value+object.id}>{object.lavel}</option>
                    
            )
        }
        
        </select> 
        <label htmlFor='ProductImage' className='text-xl mt-2'>
            Product Image
          <div className='w-full h-[10rem] bg-slate-500 cursor-pointer rounded-md shadow-lg flex flex-col justify-center items-center'>
            <IoMdCloudUpload className='text-4xl text-slate-700'/>
            <div className='text-2xl text-slate-700'>Upload Product</div>
            </div>
            <input type='file' id='ProductImage' className='hidden' onChange={productimageuploadhandler}></input>
            </label>
            <div className=' px-2 bg-white rounded-sm h-28 flex gap-2 items-center'>
            {
            data?.productImage[0]?
             data.productImage.map((url,index)=>
                {
                    return(
                        <div className='relative group'>
                    <img src={url} className='h-24 w-auto  shadow-md hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all rounded-sm' onClick={()=>
                        {
                            setUrl(url);
                            setFullImage(true);
                            
                        }
                    }></img>
                    <div className='absolute text-xl bottom-1 bg-red-600 transition-all text-center pt-1 right-1 h-6 w-6 rounded  cursor-pointer hidden group-hover:block 'onClick={()=>delteteProducthandler(index)}><MdDelete/></div>
                    </div>
                    )
                }

             )
            
             :<p className=' mx-auto text-center text-xl text-slate-700 '>Uploaded Product Show Here</p>
            }
            </div>
            <label htmlFor='Description' className='text-xl mt-2'>Description</label>
     <input type='text' id='Description' name='description' value={data.description} className='w-full h-20  text-black bg-slate-500 px-2 rounded-sm outline-none  placeholder-gray-800 text-xl' placeholder='Enter product description'onChange={setProductData}  ></input>  
     <label htmlFor='Price' className='text-xl mt-2'>Price</label>
     <input type='Number' id='Price'  name='price' value={data.price} className='w-full h-8  text-black bg-slate-500 px-2 rounded-sm outline-none  placeholder-gray-800 text-xl' placeholder='Enter product price'onChange={setProductData}  ></input>
     <label htmlFor='Discountprice' className='text-xl mt-2'>Discounted price</label>
     <input type='Number' id='Discountprice'  name='discountedprice' value={data.discountedprice} className='w-full h-8  text-black bg-slate-500 px-2 rounded-sm outline-none  placeholder-gray-800 text-xl' placeholder='Enter product discountedprice'onChange={setProductData}  ></input>
     </form>
     <button className=' mx-40 border-0 px-1 mt-10  py-1 border-md bg-gradient-to-l from-pink-600 to-purple-500 hover:to-voilet-500 hover:from-purple-500 hover:from-voilet-500 transition-all duration-500 shadow-lg ' onClick={submitProduct}>Submit</button>
      {
       getFullImage&&<FullScrUplProduct LargeImageCloseHandler={()=>setFullImage(false)}  imageURL={getUrl}  />
      }
     </div>
    </div>  
  )
}
  


export default UploadProduct
