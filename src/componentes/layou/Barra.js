import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autentificacion/authContext";

export default function Barra() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <div>
      <header className="app-header">
        {usuario ? (
          <p className="nombre-usuario">
            Hola <span>{usuario.nombre}</span>
          </p>
        ) : null}

        <nav className="nav-principal">
          <button
            className="btn btn-blank cerrar-sesion"
            onClick={() => cerrarSesion()}
          >
            Cerrar Sesión
          </button>
        </nav>
      </header>
    </div>
  );
}
