import React from 'react'
import { obtenerProveedores } from './services/registrarProveedor';
import { useState, useEffect } from 'react';

export default function ListaProveedores({handle}) {

  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    setProveedores(obtenerProveedores());
  }, [])
  
  return (

    <select  className=' p-1 m-1 bg-white text-center px-3 rounded-sm text-base' onChange={handle} required name="" id="">
      <option disabled selected value={null}>Seleccione uno</option>
      {proveedores.map(proveedor => {
        return <option className='p-1 m-1' value={proveedor.razon} key={proveedor.razon}>{proveedor.razon}</option>
      })}
    </select>
  )
}
