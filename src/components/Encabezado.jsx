import React, { useEffect, useState, useContext } from 'react'
import ListaProveedores from './ListaProveedores'
import { DataContext } from '../Contexts/DataContext';
import { HeadContext } from '../Contexts/HeadContext';


export default function Encabezado() {
  
  const {cliente, remito, OC, fecha, ubiIndex, handleFechaChange, handleOCChange, handleRemitoChange, handleUbiIndexChange, fechaDefault, setearProveedor, infoHead, formatearRemito} = useContext(HeadContext)

  setearProveedor();
 
  return (
    <div className=' text-black flex justify-between items-center w-[95%] py-2'>
        <label className='relative'>
          <span className='absolute text-xs bottom-12 ml-2'>Cliente:</span>  
          <ListaProveedores />
        </label>
        <label className='relative'>
          <span className='absolute text-xs bottom-12 ml-2'>Remito:</span> 
          <input value={remito} required
            className={ (remito ? '' : 'border-2 border-b-red-400 ') + 'w-32 p-1 m-1 text-base rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200'} onBlur={formatearRemito} type="text" placeholder='1234' onChange={handleRemitoChange} />
        </label>
        <label className='relative'>
          <span className='absolute text-xs bottom-12 ml-2'>Orden de Compra:</span>
          <input value={OC} className={(OC ? '' : ' border-2 border-b-amber-400 outline-2 outline-amber-400 ') + 'p-1 m-1 rounded-md focus:border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 w-36'} type="text" onChange={handleOCChange}  />
        </label>
        <label className='relative'>
          <span className='absolute text-xs bottom-12 ml-2'>Ubicación:</span> 
          <select defaultValue={0} value={ubiIndex} className='p-2 m-1 bg-white w-52 rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200' onChange={handleUbiIndexChange}>{infoHead.ubicacion && infoHead.ubicacion.map((ubi, index) => {
            return <option  value={index} key={ubi.direccion}>{ubi.localidad}, {ubi.direccion}</option>
          })}</select>
        </label>
        <label className='relative'>
          <span className='absolute text-xs bottom-12 ml-2'>Fecha:</span>
          <input type="date" className='p-1 m-1 bg-white rounded-md focus:border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200' value={fecha} defaultValue={fechaDefault} onChange={handleFechaChange} />
        </label>
    </div>
  )
}