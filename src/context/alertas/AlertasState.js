import React, { useReducer } from "react";
import { MOSTRAR_ALERTAS, OCULTAR_ALERTAS } from "../../types";
import { ErrorContext } from "./alertasContex";
import alertasReducer from "./alertasReducer";

export default function AlertasState(props) {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertasReducer, initialState);

  const mostarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTAS,
      payload: { msg, categoria },
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTAS,
      });
    }, 5000);
  };

  return (
    <ErrorContext.Provider value={{ alerta: state.alerta, mostarAlerta }}>
      {props.children}
    </ErrorContext.Provider>
  );
}
