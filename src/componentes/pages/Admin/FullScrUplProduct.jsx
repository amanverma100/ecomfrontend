import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
const FullScrUplProduct = ({LargeImageCloseHandler,imageURL}) => {
  return (
    <div className='absolute flex justify-center items-center bg-black top-0 bottom-0 left-0 right-0' >
    <div className=' h-[50%] relative'>
    <IoCloseSharp className='absolute top-2 right-2 text-3xl cursor-pointer  rounded-full h-10 w-10 hover:bg-red-600 ' onClick={LargeImageCloseHandler}></IoCloseSharp>
    <img src={imageURL} className=' object-scale-down max-h-full'>
    </img>
    </div>
    </div>
  )
}

export default FullScrUplProduct
