import { useContext, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { ObtenerConstantes } from "../mocks/Constantes";

export const useMaterials = ({ ident }) => { 

  const { setValue, getValues, watch, total, setTotal } = useContext(DataContext);
  const { PRECIO, CANT, DESC, CODIGO } = ObtenerConstantes(ident);

  const [totalItem, setTotalItem] = useState(0)
  const [editable, setEditable] = useState(true)

  const codeState = watch(CODIGO)
  const cant = watch(CANT)
  const price = watch(PRECIO)

  const code = getValues(CODIGO)
  
  const procesarCodigo = () => {
    if (code === '') {
      setEditable(true);
      return
    }
    if (localStorage.getItem(code) === null) {
      setValue(DESC, '');
      setEditable(true);
    } else { 
      setValue(DESC, localStorage.getItem(code))
      setEditable(false)
    }
  }
    
    const editDesc = (e) => {
    const code = getValues(CODIGO);
    const desc = getValues(DESC)
    if (editable) { 
      if (desc === undefined) {
        localStorage.removeItem(code)
      } else {
        localStorage.setItem(code, desc)
      }
    }
    setEditable(!editable);
  }

  const calcularTotal = () => {
    const precio = getValues(PRECIO)
    const cantidad = getValues(CANT)
    const newTotal = total - totalItem
    if (precio && cantidad) {
      const newTotalItem = Number(precio) * Number(cantidad)
      setTotalItem(newTotalItem);
      setTotal(newTotalItem + newTotal);
    }
  }

    return { procesarCodigo, editable, codeState, cant, price, code, totalItem, setTotalItem, editDesc, calcularTotal }
}