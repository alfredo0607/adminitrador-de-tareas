import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorContext } from "../../context/alertas/alertasContex";
import AuthContext from "../../context/autentificacion/authContext";

export default function Login(props) {
  const alertaContext = useContext(ErrorContext);
  const { alerta, mostarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  // en caso que el password este incorrecto o el email no exista
  useEffect(() => {
     if (autenticado) {
       props.history.push("/proyectos");
     }

    if (mensaje) {
      mostarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [autenticado, mensaje, props.history]);

  const [dataUsuario, setdataUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = dataUsuario;

  const tomarDatosUsuarios = (e) => {
    setdataUsuario({
      ...dataUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const enviarDatosUsuarios = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      mostarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion </h1>
        <form onSubmit={enviarDatosUsuarios}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ingresar Email"
              onChange={tomarDatosUsuarios}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraeña"
              onChange={tomarDatosUsuarios}
              value={password}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesion"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
}
