import { useState, createContext, useEffect } from "react";
import { obtenerObjetoProveedores } from "../components/services/registrarProveedor";
import { formatear } from "../components/services/formater";

export const HeadContext = createContext();

export const HeadContextProvider = ({ children }) => {
  const [cliente, setCliente] = useState('default')
  const [remito, setRemito] = useState('')
  const [OC, setOC] = useState('')
  const [ubiIndex, setUbiIndex] = useState('0')
  const [infoHead, setInfoHead] = useState({})
  const [dolar, setDolar] = useState(false)
  
  //setearProveedor();
  
  const fechaDefault = new Date().toISOString().split('T')[0];

  const [fecha, setFecha] = useState(fechaDefault)
  
  const handleRemitoChange = (e) => { 
    setRemito(e.target.value)
  }

  const handleOCChange = (e) => { 
    setOC(e.target.value)
  }

  const handleFechaChange = (e) => { 
      setFecha(e.target.value)
  }

  const handleUbiIndexChange = (e) => { 
    setUbiIndex(e.target.value)
  }

  const formatearRemito = (e) => {
    let newVal = formatear(remito)
    setRemito(newVal)
  }
    
    const setearProveedor = () => { 
      useEffect(() => {
      console.log('entre');
      const provs = obtenerObjetoProveedores(cliente);
        
      if (provs != null) {
        setInfoHead(provs);
      }

    }, [cliente])
    }
  
  const handleClienteChange = (e) => {
    setUbiIndex(0)
    setCliente(e.target.value)
  }

  const limpiarEncabezado = () => {
    setUbiIndex(0)
    setCliente('default')
    setOC('')
    setRemito('')
    setInfoHead({})
    setFecha(fechaDefault)
  }

  const handleChangeDolar = (e) => { 
    setDolar(!dolar)
  }
    
  return (
    <HeadContext.Provider value={ {cliente, remito, OC, fecha, ubiIndex, handleFechaChange, handleOCChange, handleRemitoChange, handleUbiIndexChange, fechaDefault, setearProveedor, handleClienteChange, infoHead, formatearRemito, limpiarEncabezado, dolar, handleChangeDolar}}>
      { children }
    </HeadContext.Provider>
  )
}