import React, { useEffect, useState, useContext } from 'react'
import ListaProveedores from './ListaProveedores'
import { DataContext } from '../Contexts/DataContext';
import { HeadContext } from '../Contexts/HeadContext';


export default function Encabezado() {
  
  const {cliente, remito, OC, fecha, ubiIndex, handleFechaChange, handleOCChange, handleRemitoChange, handleUbiIndexChange, fechaDefault, setearProveedor, infoHead, formatearRemito} = useContext(HeadContext)

  setearProveedor();

  console.log(ubiIndex)

  console.log(infoHead);
 
  return (
    <div className=' container text-black flex flex-col justify-center items-center gap-0 bg-slate-300 w-full h-[12vh] pt-3'>
      <div className='flex justify-center items-center gap-5'>
        <label className='relative'>
          <span className='absolute text-xs bottom-10 ml-2'>Cliente:</span>  
          <ListaProveedores />
        </label>
        <label className='relative'>
          <span className='absolute text-xs bottom-10 ml-2'>Remito:</span> 
          <input value={remito} required
            className={ (remito ? '' : 'border-2 border-b-red-600 outline-2 outline-red-600 ') + 'w-32 p-1 m-1 text-base rounded-sm'} onBlur={formatearRemito} type="text" placeholder='1234' onChange={handleRemitoChange} />
        </label>
        <label className='relative'>
          <span className='absolute text-xs bottom-10 ml-2'>Orden de Compra:</span>
          <input value={OC} className={(OC ? '' : ' border-2 border-b-amber-500 outline-2 outline-amber-500 ') + 'p-1 m-1 rounded-sm w-36'} type="text" onChange={handleOCChange}  />
        </label>
        <label className='relative'>
          <span className='absolute text-xs bottom-10 ml-2'>Ubicación:</span> 
          <select defaultValue={0} value={ubiIndex} className='p-1 m-1 bg-white rounded-sm w-52 h-8' onChange={handleUbiIndexChange}>{infoHead.ubicacion && infoHead.ubicacion.map((ubi, index) => {
            return <option  value={index} key={ubi.direccion}>{ubi.localidad}, {ubi.direccion}</option>
          })}</select>
        </label>
        <label className='relative'>
          <span className='absolute text-xs bottom-10 ml-2'>Fecha:</span>
          <input type="date" className='p-1 m-1 bg-white rounded-sm' value={fecha} defaultValue={fechaDefault} onChange={handleFechaChange} />
        </label>
      </div>
    </div>
  )
}