import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import {
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  OBTENER_TAREA,
  VALIDAR_TAREA,
  ACTUAL_TAREA,
  EDITAR_TAREA,
} from "../../types";
import TareaReducer from "./TareaReducer";
import TareaContex from "./TareasContext";

export default function TareaState(props) {
  const initialState = {
    tareasproyectos: [],
    validartarea: false,
    tareaActual: null,
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  const obtenerTareas = async (proyecto) => {
    try {
      const respuesta = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      dispatch({
        type: OBTENER_TAREA,
        payload: respuesta.data.tarea,
      });
    } catch (error) {
      console.log(error); 
    }
  };

  const agregarTarea = async (tarea) => {
    try {
      const respuesta = await clienteAxios.post("/api/tareas", tarea);
      console.log(respuesta);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {}
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {}
  };

  const actualTarea = (tarea) => {
    dispatch({
      type: ACTUAL_TAREA,
      payload: tarea,
    });
  };

  const editarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea
      );

      dispatch({
        type: EDITAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TareaContex.Provider
      value={{
        tareasproyectos: state.tareasproyectos,
        validartarea: state.validartarea,
        tareaActual: state.tareaActual,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        actualTarea,
        editarTarea,
      }}
    >
      {props.children}
    </TareaContex.Provider>
  );
}
