import { Redirect } from 'react-router-dom';
import {Route} from 'react-router-dom';
//этот компонент принимает другой компонент в качестве пропса
//он также может взять неограниченное число пропсов и передать их новому компоненту

function ProtectedRoute({loggedIn, component: Component, ...props}){
    console.log(loggedIn);
    return(
       
       <Route>
           { loggedIn === true ? <Component {...props}/>: <Redirect to="./signin"/>}
       </Route>    
    );

}

export default ProtectedRoute;