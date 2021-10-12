/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autentificacion/authContext";
import { Route, Redirect } from "react-router-dom";

export default function RutasPrivadas({ component: Component, ...props }) {
  const authContext = useContext(AuthContext);
  const { autenticado, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
