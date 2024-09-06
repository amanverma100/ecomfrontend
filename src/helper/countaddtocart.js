

import summaryAPI from '../common/index';
import axios from 'axios';
async function countaddtocart(e)
{     e?.stopPropagation();
       e?.preventDefault();
               
              
               const token=localStorage.getItem("token");
               try{
                 const response= await axios.post(summaryAPI.countaddtocart.url,
                              {
                               headers:{
                              'Authorization':`Bearer ${token}`
                              }
                              })
                              if(response?.data?.error===false)
                              {
                                  
                                   
                               return response?.data?.data;
                                   
                                   
                              }
                              else
                              {
                               return 0;
                              }
                             
                              
                 
               }
               catch(error)
               {
                   console.log(error?.response?.data?.message);
               }

}
export default countaddtocart;