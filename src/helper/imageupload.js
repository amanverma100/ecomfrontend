
const url=`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_ECOMMERCE_CLOUD_NAME}/image/upload`
const imageupload=async(image)=>{
    const formdata=new FormData();
    formdata.append("file",image);
    formdata.append("upload_preset","mern_product")
        const response=await fetch(url,
         { method:"post",
            body:formdata
         }
         
        )
        return response.json();

    
     
}
export default imageupload;