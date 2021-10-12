import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./componentes/auth/Login";
import NuevaCuenta from "./componentes/auth/NuevaCuenta";
import Proyectos from "./componentes/proyectos/Proyectos";
import RutasPrivadas from "./componentes/rutas/rutasPrivadas";
import tokenAuth from "./config/tokenAuth";
import AlertasState from "./context/alertas/AlertasState";
import AuthState from "./context/autentificacion/authState";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/Tareas/TareaState";

// revisamos si tenemos token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertasState>
          <AuthState>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutasPrivadas exact path="/proyectos" component={Proyectos} />
              </Switch>
            </BrowserRouter>
          </AuthState>
        </AlertasState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
