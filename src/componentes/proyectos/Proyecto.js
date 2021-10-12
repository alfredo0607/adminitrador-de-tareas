import React, { useContext } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContex from "../../context/Tareas/TareasContext";

export default function Proyecto({ proyect }) {
  const proyectoContext = useContext(ProyectoContext);
  const { seleccionarProyecto } = proyectoContext;

  const tareaContext = useContext(TareaContex);
  const { obtenerTareas } = tareaContext;

  const seleccionar = (id) => {
    seleccionarProyecto(id);
    obtenerTareas(id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionar(proyect._id)}
      >
        {proyect.nombre}
      </button>
    </li>
  );
}
