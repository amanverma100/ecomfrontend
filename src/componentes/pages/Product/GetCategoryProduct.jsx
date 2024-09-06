import React from 'react'
import { useParams } from 'react-router-dom'
const GetCategoryProduct = () => {
     const param=useParams();
  return (
    <div>
      {param.categoryname}                    
    </div>
  )
}

export default GetCategoryProduct
