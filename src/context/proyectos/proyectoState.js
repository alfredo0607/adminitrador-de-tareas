import React, { useReducer } from "react";
import ProyectoContext from "./proyectoContext";
import ProyectoReducer from "./proyectoReducer";
import clienteAxios from "../../config/axios";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  VALIDAR_PROYECTO,
  SELECCIONAR_PROYECTO,
  ELIMINAR_PROYECTO,
  ERROR_PROYECTO,
} from "../../types";

const ProyectoState = (props) => {
  const initialState = {
    proyecto: [],
    formulario: false,
    validarformulario: false,
    seleccionarproyecto: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(ProyectoReducer, initialState);

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/proyecto");
      dispatch({
        type: OBTENER_PROYECTO,
        payload: respuesta.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };

  const agregarProyecto = async (proyecto) => {
    try {
      const respuesta = await clienteAxios.post("/api/proyecto", proyecto);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_PROYECTO,
    });
  };

  const seleccionarProyecto = (proyectoId) => {
    dispatch({
      type: SELECCIONAR_PROYECTO,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyecto/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };

  return (
    <ProyectoContext.Provider
      value={{
        seleccionarproyecto: state.seleccionarproyecto,
        validarformulario: state.validarformulario,
        proyecto: state.proyecto,
        formulario: state.formulario,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        seleccionarProyecto,
        eliminarProyecto,
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoState;
