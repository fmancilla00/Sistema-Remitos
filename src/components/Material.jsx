import React from 'react'
import './stylesheets/Material.css'
import { useState } from 'react'
import { FiEdit3, FiSave } from "react-icons/fi"
import { RxCross1 } from "react-icons/rx";
import { subTotal } from './services/calculos';
import { RxCrossCircled } from "react-icons/rx";



export default function Material({ident, handleDelete, reg, setValue, getValues, watch, total, setTotal}) {

  const [editable, setEditable] = useState(true)
  const [totalItem, setTotalItem] = useState(0)

  const codeState = watch(`${ident}.codigo`)
  const cant = watch(`${ident}.cantidad`)
  const price = watch(`${ident}.precio`)
  
  const handleCodeBlur = () => {
    const code = getValues(`${ident}.codigo`)
    if (code === '') {
      setEditable(true);
      return
    }
    if (localStorage.getItem(code) === null) {
      setValue(`${ident}.descripcion`, '');
      setEditable(true);
    } else { 
      setValue(`${ident}.descripcion`, localStorage.getItem(code))
      setEditable(false)
    }
  }

  const editDesc = (e) => {
    const code = getValues(`${ident}.codigo`);
    const desc = getValues(`${ident}.descripcion`)
    if (editable) { 
      if (desc === undefined) {
        localStorage.removeItem(code)
      } else {
        localStorage.setItem(code, desc)
      }
    }
    setEditable(!editable);
  }

  const calcularTotal = () => {
    const precio = getValues(`${ident}.precio`)
    const cantidad = getValues(`${ident}.cantidad`)
    const newTotal = total - totalItem
    if (precio && cantidad) {
      const newTotalItem = Number(precio) * Number(cantidad)
      setTotalItem(newTotalItem);
      setTotal(newTotalItem + newTotal);
    }
  }
  
  const verSubmit = e => { 
    e.preventDefault();
  }


  return (
    <tr className='bg-slate-300 border-separate ' autoComplete='off' onSubmit={verSubmit}>
      <td>
        <input  {...reg(`${ident}.cantidad`)}  placeholder="Cant." onBlur={calcularTotal} className=' text-center p-1 m-1 w-14 rounded-sm text-sm' type="number"/>
      </td>

      <td className=''>
        <input {...reg(`${ident}.codigo`)} onBlur={handleCodeBlur} placeholder='Código' className='w-24 p-1 m-1 text-sm rounded-sm' type="text" />
      </td>
      <td className=''>
        <input  {...reg(`${ident}.descripcion`)} placeholder='Descripción' className='w-96 p-1 m-1 rounded-sm text-sm' type="text" readOnly={!editable} tabIndex={(localStorage.getItem(codeState) === null) ? undefined : -1} />
      </td>

      <td  className=' items-center w-5'>
        {(getValues(`${ident}.codigo`) && getValues(`${ident}.codigo`) != undefined) ?
          <button title={editable ? 'Guardar desc. en el registro de códigos' : 'Editar descripción'} tabIndex={-1} className='hover:text-blue-700 transition flex items-center justify-end ml-2 text-xl' onClick={editDesc} type='button' >{editable ? <FiSave className='bg-white rounded-md p-1 w-6 h-6 '/> : <FiEdit3 className='bg-white   rounded-md p-1 w-6 h-6'/>}</button>
          : ''
        }
      </td>

      <td>
        <input   placeholder='Precio unit.' {...reg(`${ident}.precio`)} onBlur={calcularTotal} className='p-1 m-1 w-24 rounded-sm text-sm' type="number" step="0.01"/>
      </td>
      <td className='text-center'>
        <button title='Eliminar item' tabIndex={-1} type="button" className=' transition hover:text-red-500 flex items-center justify-start mx-2 mr-4 ' onClick={() => { handleDelete(ident) }}><RxCrossCircled className='w-5 h-5  font-bold rounded-full bg-white border-2 border-white text-lg p-0' /></button>
      </td>
      <td className='w-32 overflow-hidden text-start justify-self-end text-sm'>
         <p className=' text-center bg-white p-1 mr-2 rounded-sm h-auto max-w-s'>{cant && price && subTotal(cant, price)}</p>
      </td>
    </tr>  
  )
}
