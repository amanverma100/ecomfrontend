 import{createBrowserRouter} from 'react-router-dom';
 import App from '../App';
 import Home from '../componentes/pages/Home';
 import Login from '../componentes/pages/Login';
import Resetpassword from '../componentes/pages/Resetpassword';
import Signup from '../componentes/pages/Signup';
import Adminpanel from '../componentes/pages/Admin/Adminpanel';
import Users from '../componentes/pages/Admin/Users';
import Updateuser from '../componentes/pages/Admin/Updateuser';
import Products from '../componentes/pages/Admin/Products';
import GetCategoryProduct from '../componentes/pages/Product/GetCategoryProduct';
import ProductDetail from '../componentes/pages/Product/ProductDetail';
const router=createBrowserRouter([{
    path:"/",
    element:<App/>,
    children:[
        {
            path:"",
            element:<Home/>
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"forgotpassword",
            element:<Resetpassword/>
        },
        {
            path:"signup",
            element:<Signup/>
        },
        {
            path:"admin",
            element:<Adminpanel/>,
            children:[
                {
                    path:"users",
                    element:<Users/>
                },
                {
                    path:"updateuser",
                    element:<Updateuser/>
                },
                { path:"products",
                  element:<Products/>
                }
            ]
        },
        {
            path:"categoryproduct/:categoryname",
            element:<GetCategoryProduct/>
        },
        {
            path:"productdetail/:id",
            element:<ProductDetail/>
        },
        
            
        
       

    ]
 }
 ])
 export default router;