
import {toast} from 'react-toastify';
import summaryAPI from '../common/index';
import axios from 'axios';
async function addtocart(e,productId)
{     e?.stopPropagation();
       e?.preventDefault();
               
              
               const token=localStorage.getItem("token");
               try{
                 const response= await axios.post(summaryAPI.addtocart.url,{productId:productId},
                              {
                               headers:{
                              'Authorization':`Bearer ${token}`
                              }
                              })
                              if(response?.data?.error===false)
                              {
                                   if(response?.data?.alert===true)
                                   {
                                             toast.error(response?.data?.message);
                                   }
                                   else
                                   {
                                             toast.success(response?.data?.message);
                                   }
                              }
                              
                 
               }
               catch(error)
               {
                   toast.error(error?.response?.data?.message);
               }

}
export default addtocart;