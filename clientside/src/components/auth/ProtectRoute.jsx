
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoutes = ({children, user, redirect='/login'})=>{
    console.log(children);
    if(!user) return <Navigate to={redirect}/>
    
    return children ? children : <Outlet/>;
}
export default ProtectedRoutes;