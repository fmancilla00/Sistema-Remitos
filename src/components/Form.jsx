import React, { useEffect } from 'react'
import Material from './Material'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addMaterials } from './services/addMaterials';
import { BiAddToQueue } from "react-icons/bi";
import { useForm } from 'react-hook-form';


export default function Form({ setElementos, setImprimir}) {

  const [materials, setMaterials] = useState([])
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newMats = addMaterials(6);
    setMaterials(newMats);
   },
    [])

  const addMaterial = () => {
    const newMat = { id: uuidv4() }
    setMaterials([...materials, newMat])
  }
  const deleteMaterial = (ident) => {
    const newMats = materials.filter((mat) => mat.id !== ident)
    setMaterials(newMats);
  }
  
  const verForm = data => {
    setElementos(data);
    setImprimir(true);
  }

  const { register, handleSubmit, reset, setValue, getValues, watch } = useForm(); 

  return (
    <>

      <div className=' text-black flex px-36 items-center justify-between py-2 mb-5 font-medium border-b-2 border-black'>
        <h3 className=' w-28 p-1 rounded-sm '>Código Mat.</h3>
        <h3 className='w-96 p-1  rounded-sm  '>Descripción Breve</h3>
        <h3 className='p-1 w-14  ml-5 rounded-sm text-end'>Cantidad</h3>
        <h3 className='p-1 m-1 w-24 rounded-sm  ml-5 text-end'>Precio Unit.</h3>
          <h3 className=' w-32 overflow-hidden text-start justify-self-end'>Precio total</h3>
          <span className=' w-4 '></span>
      </div>
      <form onSubmit={handleSubmit(verForm)} className='text-black'>
        {  
          materials.map((mat) => {
            const { id } = mat;
          return(
            <Material watch={watch} setValue={setValue} getValues={getValues} reg={register} key={id} ident={id} handleDelete={deleteMaterial} total={total} setTotal={setTotal} />
          )
        })}
        <span onClick={addMaterial}><BiAddToQueue /></span>
        <div>{
          parseFloat(total).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
        }</div>
        <button>send</button>
      </form>
    </>
  )
}
