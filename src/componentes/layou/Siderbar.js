import React from "react";
import ListadoProyecto from "../proyectos/ListadoProyecto";
import NuevoProyecto from "../proyectos/NuevoProyecto";

export default function Siderbar() {
  return (
    <aside>
      <h1>
        Manager <span>Tasks</span>
      </h1>

      <NuevoProyecto />

      <div className="proyectos">
        <h2> Tus Proyectos</h2>
        <ListadoProyecto />
      </div>
    </aside>
  );
}
