import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorContext } from "../../context/alertas/alertasContex";
import AuthContext from "../../context/autentificacion/authContext";

export default function NuevaCuenta(props) {
  const alertaContext = useContext(ErrorContext);
  const { alerta, mostarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [autenticado, mensaje, mostarAlerta, props.history]);

  const [datosRegistros, setdatosRegistros] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const tomarDatos = (e) => {
    setdatosRegistros({
      ...datosRegistros,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, email, password, confirmar } = datosRegistros;

  const enviarDatos = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    if (password.length <= 8) {
      mostarAlerta("La contraseña debe tener maximo 8 digitos", "alerta-error");
      return;
    }

    if (password !== confirmar) {
      mostarAlerta("La contraseña no coinsiden", "alerta-error");
      return;
    }

    registrarUsuario({ nombre, email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta </h1>
        <form onSubmit={enviarDatos}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={tomarDatos}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={tomarDatos}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="Contraseña">Nueva contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={tomarDatos}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu Password"
              value={confirmar}
              onChange={tomarDatos}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
