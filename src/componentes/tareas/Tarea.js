import React, { Fragment, useContext } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContex from "../../context/Tareas/TareasContext";

export default function Tarea({ tareas }) {
  const tareaContext = useContext(TareaContex);
  const { eliminarTarea, obtenerTareas, editarTarea, actualTarea } =
    tareaContext;

  const proyectoContext = useContext(ProyectoContext);
  const { seleccionarproyecto } = proyectoContext;

  const [proyectoActual] = seleccionarproyecto;

  const eliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual.id);
  };

  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    editarTarea(tarea);
  };

  const seleccionarTarea = (tarea) => {
    actualTarea(tarea);
  };

  return (
    <Fragment>
      <li className="tarea sombra">
        <p>{tareas.nombre}</p>

        <div className="estado">
          {tareas.estado ? (
            <button
              className="completo"
              type="button"
              onClick={() => cambiarEstado(tareas)}
            >
              Completo
            </button>
          ) : (
            <button
              className="inconmpleto"
              type="button"
              onClick={() => cambiarEstado(tareas)}
            >
              Incompleto
            </button>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tareas)}
        >
          Editar
        </button>

        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => eliminar(tareas._id)}
        >
          Eliminar
        </button>
      </li>
    </Fragment>
  );
}
