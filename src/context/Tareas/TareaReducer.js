import {
  ACTUAL_TAREA,
  AGREGAR_TAREA,
  EDITAR_TAREA,
  ELIMINAR_TAREA,
  OBTENER_TAREA,
  VALIDAR_TAREA,
} from "../../types";

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case OBTENER_TAREA:
      return {
        ...state,
        tareasproyectos: action.payload,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        validartarea: true,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasproyectos: [action.payload, ...state.tareasproyectos],
        validartarea: false,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasproyectos: state.tareasproyectos.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case EDITAR_TAREA:
      return {
        ...state,
        tareasproyectos: state.tareasproyectos.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
        tareaActual: null,
      };
    case ACTUAL_TAREA:
      return {
        ...state,
        tareaActual: action.payload,
      };

    default:
      return state;
  }
};
