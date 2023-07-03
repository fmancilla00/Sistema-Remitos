import React, { useContext, useEffect } from 'react'
import Material from './Material'
import { BiAddToQueue } from "react-icons/bi";
import Encabezado from './Encabezado';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { DataContext } from '../Contexts/DataContext';


export default function Form() {

  const { total, ids, addId, addInitialIds, handleSubmit, procesarDatos, datos, reiniciarRemito } = useContext(DataContext);

  if (datos === null) {
    addInitialIds();
  }

  return (
    <>
          <div className="  min-h-screen relative flex items-center justify-center flex-col text-center py-12 px-8">
            <Link  title="Volver" to='/' className=' hover:-translate-x-0.5 transition absolute top-0 left-0 m-6 text-3xl text-slate-800' ><BsFillArrowLeftCircleFill/></Link>
            <form onSubmit={handleSubmit(procesarDatos)} className='text-black'>
              <Encabezado  />
            <table className=' mx-auto'>
            <thead className=' border-b-2 border-black'>  
            <tr className=''>
              <th className=' text-center p-2'>Pos</th>
              <th className='w-20'>Cantidad</th>
              <th className=' p-2 w-32'>Código Mat.</th>
                  <th className=''>Descripción Breve</th>
                  <th> </th>
              <th className=' w-32'>Precio Unit.</th>
                  <th className='w-1'></th>
                  <th className='w-32 text-center'>Precio total</th>
            </tr>
            </thead>
            <tbody>      
            {  
              ids.map((id, index) => {
                return (
                  <Material key={id} ident={id} size={index} />
              )
            })}
              
            </tbody>
              </table>
              <div className='flex mx-auto justify-between w-5/6'>
              <button type='button' title='Agregar un material' className='m-2' onClick={addId}><BiAddToQueue className='w-6 h-6 bg-white  hover:text-blue-700 transition rounded-md p-1' /></button>
              <button title='Nuevo remito' type='button' onClick={reiniciarRemito}><AiOutlineClear className='w-6 h-6 bg-white  hover:text-red-500 transition rounded-md p-1'/></button>
              </div>
              <div className=''>
                <strong className='m-3'>Subtotal: </strong>
                { parseFloat(total).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
              } <strong className='ml-3'>|</strong> <strong className='m-3'>Total con impuestos:</strong> { (parseFloat(total)*1.21).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }</div>
            <button type='submit' className=' bg-slate-600 text-white font-normal p-3  mt-5 rounded-sm hover:bg-slate-700 transition' >Confirmar Datos</button>
              </form>
        </div>
    </>
  )
}
