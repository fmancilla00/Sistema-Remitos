import React from 'react'
import { obtenerProveedores } from './services/registrarProveedor';
import { useState, useEffect } from 'react';

export default function ListaProveedores({handle, register, selected}) {

  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    setProveedores(obtenerProveedores());
  }, [])
  
  return (

    <select autoFocus required {...register('head.empresa')} className={ (selected ? '' : ' border-2 border-b-red-500 outline-2 outline-red-500') + ' p-1 m-1 bg-white text-center px-3 w-64 rounded-sm text-base'} onChange={handle} name="" id="">
      <option disabled selected value="none">Seleccione una opcion</option>
      {proveedores.map(proveedor => {
        return <option className='p-1 m-1' value={proveedor.razon} key={proveedor.razon}>{proveedor.razon}</option>
      })}
    </select>
  )
}
