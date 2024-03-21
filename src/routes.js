import React from "react";
import { BrowserRouter,Switch,Route} from "react-router-dom";
import PrivateRoute from './hooks/useAxiosPrivate'


import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Transferir from "./pages/Transferir";
import TelaInicial from "./pages/TelaInicial";
import Extrato from "./pages/Extrato";



function Routes(props){
    
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact  component={Login} />
                <Route path="/cadastro" component={Cadastro}/>
                <PrivateRoute path="/transferir" component={Transferir}/>
                <PrivateRoute path="/home" component={TelaInicial}  />
                <PrivateRoute path="/extrato" component={Extrato}/>
            </Switch>
        
        </BrowserRouter>
    );
};

export default Routes;