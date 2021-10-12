import React, { useContext } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContex from "../../context/Tareas/TareasContext";
import Tarea from "./Tarea";
import { TransitionGroup, CSSTransition } from "react-transition-group";
export default function ListadoTareas() {
  const proyectoContext = useContext(ProyectoContext);
  const { seleccionarproyecto, eliminarProyecto } = proyectoContext;

  const tareaContext = useContext(TareaContex);
  const { tareasproyectos } = tareaContext;

  if (!seleccionarproyecto) {
    return <h2>Selecciona un proyecto</h2>;
  }
  const [proyectoSeleccionado] = seleccionarproyecto;

  return (
    <div>
      <h2>Proyecto : {proyectoSeleccionado.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyectos.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyectos.map((tareas) => (
              <CSSTransition key={tareas._id} className="tarea" timeout={200}>
                <Tarea  tareas={tareas} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyectoSeleccionado._id)}
      >
        Eliminar Proyecto &times;
      </button>
    </div>
  );
}
