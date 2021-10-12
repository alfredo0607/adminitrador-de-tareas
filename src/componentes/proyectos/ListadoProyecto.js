/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import Proyecto from "./Proyecto";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ErrorContext } from "../../context/alertas/alertasContex";

export default function ListadoProyecto() {
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto, mensaje, obtenerProyectos } = proyectoContext;

  const alertaContext = useContext(ErrorContext);
  const { alerta, mostarAlerta } = alertaContext;

  useEffect(() => {
    if (mensaje) {
      mostarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();
  }, [mensaje]);

  if (proyecto.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}

      <TransitionGroup>
        {proyecto.map((proyect) => (
          <CSSTransition key={proyect._id} timeout={200} classNames="proyecto">
            <Proyecto proyect={proyect} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}
