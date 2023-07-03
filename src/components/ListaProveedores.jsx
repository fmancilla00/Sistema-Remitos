import React from 'react'
import { useContext } from 'react';
import { DataContext } from '../Contexts/DataContext';
import { useProveedores } from '../Hooks/useProveedores';

export default function ListaProveedores() {

  const { proveedores } = useProveedores();

  const { register, handleSelect, selected } = useContext(DataContext);

  return (

    <select autoFocus required {...register('head.empresa')} defaultValue='seleccion' className={(selected ? '' : ' border-2 border-b-red-500 outline-2 outline-red-500') + ' p-1 m-1 bg-white text-center px-3 w-64 rounded-sm text-base'} name="" id="" onChange={handleSelect}>
      <option disabled value="seleccion">Seleccione uno</option>
      {proveedores.map(proveedor => {
        return <option className='p-1 m-1' value={proveedor.razon} key={proveedor.razon}>{proveedor.razon}</option>
      })}
    </select>
  )
}
