import React, { Fragment, useContext, useEffect, useState } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContex from "../../context/Tareas/TareasContext";
import { v4 as uuidv4 } from "uuid";

export default function FormTarea() {
  const tareaContext = useContext(TareaContex);
  const {
    agregarTarea,
    validarTarea,
    validartarea,
    obtenerTareas,
    tareaActual,
    editarTarea,
  } = tareaContext;
  const proyectoContext = useContext(ProyectoContext);
  const { seleccionarproyecto } = proyectoContext;

  useEffect(() => {
    if (tareaActual !== null) {
      settarea(tareaActual);
    } else {
      settarea({
        nombre: "",
      });
    }
  }, [tareaActual]);

  const [tarea, settarea] = useState({
    nombre: "",
  });

  const { nombre } = tarea;

  const TomarTarea = (e) => {
    settarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const EnviarTarea = (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    if (tareaActual === null) {
      tarea.idTarea = uuidv4();
      tarea.proyecto = proyectoSeleccionado._id;
      agregarTarea(tarea);
    } else {
      editarTarea(tarea);
    }

    obtenerTareas(proyectoSeleccionado.id);

    settarea({
      nombre: "",
    });
  };

  if (!seleccionarproyecto) {
    return null;
  }

  const [proyectoSeleccionado] = seleccionarproyecto;

  return (
    <Fragment>
      <div className="formulario">
        <form onSubmit={EnviarTarea}>
          <div className="contenedor-input">
            <input
              type="text"
              name="nombre"
              placeholder="Agrega Tu Tarea..."
              className="input-text"
              onChange={TomarTarea}
              value={nombre}
            />
          </div>
          <div className="contenedor-input">
            <input
              type="submit"
              value={tareaActual ? "Editar tarea" : "Agregar tarea"}
              className="btn btn-primario btn-submit btn-block"
            />
          </div>
        </form>
        {validartarea ? (
          <p className="mensaje error">La tarea tiene que tener un nombre</p>
        ) : null}
      </div>
    </Fragment>
  );
}
