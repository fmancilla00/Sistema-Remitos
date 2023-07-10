import React from 'react'
import './stylesheets/Material.css'
import { FiEdit3, FiSave } from "react-icons/fi"
import { subTotal } from './services/calculos';
import { RxCrossCircled } from "react-icons/rx";
import { useContext, useState } from 'react';
import { DataContext } from '../Contexts/DataContext';
import { useMaterials } from '../Hooks/useMaterial';
import { ObtenerConstantes } from '../mocks/Constantes';


export default function Material({ident, size}) {

  const { register: reg, getValues, deleteMaterial, usaCodigo } = useContext(DataContext);
  
  const { PRECIO, CANT, DESC, CODIGO } = ObtenerConstantes(ident);
  

  const { procesarCodigo,  codeState, cant, price, editDesc, calcularTotal, editable, setEditable} = useMaterials({ ident });
  

  return (
    <tr className='bg-slate-300 border-separate ' autoComplete='off'>
      <td className='text-center'>{size + 1}</td>
      <td>
        <input  {...reg(CANT)}  placeholder="Cant." onBlur={calcularTotal} className=' text-center p-1 m-1 w-14 rounded-sm text-sm' type="number"/>
      </td>
      {
        usaCodigo &&  
          <td className=''>
            <input {...reg(CODIGO)} onBlur={procesarCodigo} placeholder='Código' className='w-24 p-1 m-1 text-sm rounded-sm' type="text" />
          </td>
      }
      <td className=''>
        <input  {...reg(DESC)} placeholder='Descripción' className='w-96 p-1 m-1 rounded-sm text-sm' type="text" readOnly={!editable && usaCodigo} onChange={() => { setEditable(true)}} tabIndex={(localStorage.getItem(codeState) === null || !usaCodigo) ? undefined : -1} />
      </td>

      <td  className=' items-center w-5'>
        {(getValues(CODIGO) && getValues(CODIGO) != undefined && usaCodigo) ?
          <button title={editable ? 'Guardar desc. en el registro de códigos' : 'Editar descripción'} tabIndex={-1} className='hover:text-blue-700 transition flex items-center justify-end ml-2 text-xl' onClick={editDesc} type='button' >{editable ? <FiSave className='bg-white rounded-md p-1 w-6 h-6 '/> : <FiEdit3 className='bg-white   rounded-md p-1 w-6 h-6'/>}</button>
          : ''
        }
      </td>

      <td>
        <input   placeholder='Precio unit.' {...reg(PRECIO)} onBlur={calcularTotal} className='p-1 m-1 w-24 rounded-sm text-sm' type="number" step="0.01"/>
      </td>
      <td className='w-32 overflow-hidden text-start justify-self-end text-sm'>
         <p className=' text-center bg-white p-1 mr-2 rounded-sm h-auto max-w-s'>{cant && price && subTotal(cant, price)}</p>
      </td>
      <td className='text-center'>
        <button title='Eliminar item' tabIndex={-1} type="button" className=' transition hover:text-red-500 flex items-center justify-start mx-2 mr-4 ' onClick={() => { deleteMaterial(ident) }}><RxCrossCircled className='w-5 h-5  font-bold rounded-full bg-white border-2 border-white text-lg p-0' /></button>
      </td>
    </tr>  
  )
}
