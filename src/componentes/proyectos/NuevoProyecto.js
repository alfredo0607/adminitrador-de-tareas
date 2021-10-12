import React, { Fragment, useContext, useState } from "react";
import { ErrorContext } from "../../context/alertas/alertasContex";
import ProyectoContext from "../../context/proyectos/proyectoContext";

export default function NuevoProyecto() {
  const alertaContext = useContext(ErrorContext);
  const { alerta, mostarAlerta } = alertaContext;

  const proyectoContext = useContext(ProyectoContext);
  const { formulario, validarformulario, mostrarFormulario, agregarProyecto } =
    proyectoContext;

  const [gproyecto, guardarProyecto] = useState({
    nombre: "",
  });

  const { nombre } = gproyecto;

  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...gproyecto,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProyecto = (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      mostarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    agregarProyecto(gproyecto);

    guardarProyecto({
      nombre: "",
    });
  };

  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {validarformulario ? (
        <p className="mensaje error"> El nombre del proyecto es obligatorio </p>
      ) : null}
    </Fragment>
  );
}
