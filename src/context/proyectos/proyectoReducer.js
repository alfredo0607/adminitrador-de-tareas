/* eslint-disable import/no-anonymous-default-export */
import {
  AGREGAR_PROYECTO,
  ELIMINAR_PROYECTO,
  ERROR_PROYECTO,
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  SELECCIONAR_PROYECTO,
  VALIDAR_PROYECTO,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };
    case OBTENER_PROYECTO:
      return {
        ...state,
        proyecto: action.payload,
      };
    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyecto: [...state.proyecto, action.payload],
        formulario: false,
        validarformulario: false,
      };
    case VALIDAR_PROYECTO:
      return {
        ...state,
        validarformulario: true,
      };
    case SELECCIONAR_PROYECTO:
      return {
        ...state,
        seleccionarproyecto: state.proyecto.filter(
          (proyectos) => proyectos._id === action.payload
        ),
        ocultar: true,
      };
    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyecto: state.proyecto.filter(
          (proyectos) => proyectos._id !== action.payload
        ),
        seleccionarproyecto: null,
      };
    case ERROR_PROYECTO:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};
