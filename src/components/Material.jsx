import React from 'react'
import './stylesheets/Material.css'
import { useState } from 'react'
import { FiEdit3, FiSave } from "react-icons/fi"
import { RxCross1 } from "react-icons/rx";
import { subTotal } from './services/calculos';



export default function Material({ident, handleDelete, reg, setValue, getValues, watch, total, setTotal}) {

  const [editable, setEditable] = useState(true)
  const [totalItem, setTotalItem] = useState(0)

  const codeState = watch(`${ident}.codigo`)
  const cant = watch(`${ident}.cantidad`)
  const price = watch(`${ident}.precio`)
  
  const handleCodeBlur = () => {
    const code = getValues(`${ident}.codigo`)
    console.log(code);
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
    console.log(precio);
    console.log(cantidad);
    if (precio && cantidad) {
      const newTotalItem = Number(precio) * Number(cantidad)
      setTotalItem(newTotalItem);
      setTotal(newTotalItem + newTotal);
    }
  }
  
  const verSubmit = e => { 
    e.preventDefault();
    console.log(e);
  }


  return (
    <div className=' flex px-36 items-center justify-between gap-2' autoComplete='off' onSubmit={verSubmit}>
      <input {...reg(`${ident}.codigo`)} onBlur={handleCodeBlur} placeholder='Código' className='w-24 p-1 m-1 text-sm rounded-sm' type="text" />
      <input  {...reg(`${ident}.descripcion`)} placeholder='Descripción' className='w-96 p-1 m-1 rounded-sm text-sm' type="text" readOnly={!editable} tabIndex={(localStorage.getItem(codeState) === null) ? undefined : -1} />
      {codeState !== undefined ?
        <span  className=' text-lg cursor-pointer inline-block' onClick={editDesc} tabIndex="-1">
          {editable ? <FiSave/> : <FiEdit3/>}
        </span>
        : '----'
      }
      <input  {...reg(`${ident}.cantidad`)} onBlur={calcularTotal} className='p-1 m-1 w-14 rounded-sm text-sm' type="number"/>
      <input  {...reg(`${ident}.precio`)} onBlur={calcularTotal} className='p-1 m-1 w-24 rounded-sm text-sm' type="number"/>
      <span className=' w-32 overflow-hidden text-start justify-self-end text-sm' >{
        cant && price && subTotal(cant, price)}</span>
      <span className=' w-4  inline-block' onClick={() => { handleDelete(ident) }}><RxCross1 /></span>
    </div>  
  )
}
