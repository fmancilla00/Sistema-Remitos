import { useState, useEffect } from "react";
import { obtenerProveedores } from "../components/services/registrarProveedor";


export const useProveedores = () => { 

  const [proveedores, setProveedores] = useState([]);
  
  useEffect(() => {
    setProveedores(obtenerProveedores());
  }, [])
  
  return { proveedores }
}