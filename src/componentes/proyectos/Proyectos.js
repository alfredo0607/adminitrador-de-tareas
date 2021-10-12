/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autentificacion/authContext";
import Barra from "../layou/Barra";
import Siderbar from "../layou/Siderbar";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";

export default function Proyectos() {
  // extraer la informacion de autentificacion

  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <div className="contenedor-app">
      <aside>
        <Siderbar />
      </aside>

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
}
