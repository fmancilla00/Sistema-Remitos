import React, { useEffect, useState, useContext } from 'react'
import ListaProveedores from './ListaProveedores'
import { DataContext } from '../Contexts/DataContext';


export default function Encabezado() {
  
  const { watch, register, infoHead, formatearRemito, handleUbi, ubiIndex, setearProveedor } = useContext(DataContext);

  
  setearProveedor();

  const fechaDefault = new Date().toISOString().split('T')[0];
  

  return (
    <div className=' container text-black flex flex-col justify-center items-center gap-4'>
      <div className='flex justify-center items-center gap-5'>
        <ListaProveedores />
          <input  {...register('head.remito')} required
            className={ ( watch('head.remito') ? '' : 'border-2 border-b-red-600 outline-2 outline-red-600 ') + 'w-32 p-1 m-1 text-base rounded-sm'} onBlur={formatearRemito} type="text" placeholder='Remito N°' />
          <input {...register('head.OC')} className={( watch('head.OC') ? '' : ' border-2 border-b-amber-500 outline-2 outline-amber-500 ') +  'p-1 m-1 rounded-sm w-36'} type="text" placeholder='Orden de Compra' />
        <label>Ubicación: 
          <select className='p-1 m-1 bg-white rounded-sm w-52' {...register('head.ubiIndex')} onChange={handleUbi}>{infoHead.ubicacion && infoHead.ubicacion.map((ubi, index) => {
            return <option  value={index} key={ubi.direccion}>{ubi.localidad}, {ubi.direccion}</option>
          })}</select>
        </label>
        <input type="date" className='p-1 m-1 bg-white rounded-sm' {...register('head.fecha', {value: fechaDefault})} />
      </div>

      <div className='flex items-center  justify-around  p-1 w-full gap-5'>
        <h4> <strong>Domicilio:</strong> {infoHead.ubicacion && ubiIndex && infoHead.ubicacion[ubiIndex].direccion}</h4>
        <h4><strong>Localidad:</strong> {infoHead.ubicacion && ubiIndex && infoHead.ubicacion[ubiIndex].localidad}</h4>
        <h4><strong>CUIT:</strong> {infoHead.cuit && infoHead.cuit}</h4>
        <h4><strong>Teléfono:</strong> {infoHead.tel && infoHead.tel}</h4>
        <h4><strong>N° Cliente:</strong> {infoHead.numCliente && infoHead.numCliente}</h4>
      </div>
    </div>
  )
}