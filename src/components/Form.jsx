import React, { useEffect } from 'react'
import Material from './Material'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addMaterials } from './services/addMaterials';
import { BiAddToQueue } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import Encabezado from './Encabezado';
import Printable from './Printable';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";




export default function Form({ setElementos}) {

  const [materials, setMaterials] = useState([])
  const [total, setTotal] = useState(0);
  const [infoHead, setInfoHead] = useState({}); 
  const [datos, setDatos] = useState(null);
  const [imprimir, setImprimir] = useState(false);

  const restaurarEstados = () => { 
    setInfoHead({});
    reset();
    if (imprimir) {
      setMaterials([]);
      setImprimir(false);
    } else { 
      const codes = Object.keys(materials).slice(1);
      codes.forEach(code => { deleteMaterial(code) })
      setMaterials(addMaterials(9))
    }
    setTotal(0);
    setDatos(null);
  }

  useEffect(() => {
    if (!imprimir && datos == null) {
      const newMats = addMaterials(9);
      setMaterials(newMats);
    }
   },
    [imprimir])

  const addMaterial = () => {
    const newMat = { id: uuidv4(), pos: materials.length }
    setMaterials([...materials, newMat])
  }
  const deleteMaterial = (ident) => {
    const newMats = materials.filter((mat) => mat.id !== ident)
    setTotal(total - Number((getValues(`${ident}.precio`))* Number(getValues(`${ident}.cantidad`))));
    unregister(`${ident}.codigo`)
    unregister(`${ident}.descripcion`)
    unregister(`${ident}.cantidad`)
    unregister(`${ident}.precio`)
    setMaterials(newMats);

  }


  const verForm = data => {
    data.head.data = infoHead;
    setDatos(data);
    setImprimir(true);
  }
  const { register, handleSubmit, unregister, reset, setValue, getValues, watch } = useForm(); 
  
  console.log(materials.length);
  return (
    <>
      {
        !imprimir
          ? 
          <div className="  min-h-screen relative flex items-center justify-center flex-col text-center py-12 px-8">
            <Link  title="Volver" to='/' className=' hover:-translate-x-0.5 transition absolute top-0 left-0 m-6 text-3xl text-slate-800' ><BsFillArrowLeftCircleFill/></Link>
            <form onSubmit={handleSubmit(verForm)} className='text-black'>
              <Encabezado watch={watch} register={register} getValues={getValues} setValue={setValue} setInfoHead={setInfoHead} />
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
              materials.map((mat, index) => {
                const { id } = mat;
              return(
                <Material watch={watch} setValue={setValue} getValues={getValues} reg={register} key={id} ident={id} handleDelete={deleteMaterial} total={total} setTotal={setTotal} size={index} />
              )
            })}
            </tbody>
              </table>
              <div className='flex mx-auto justify-between w-5/6'>
              <button type='button' title='Agregar un material' className='m-2' onClick={addMaterial}><BiAddToQueue className='w-6 h-6 bg-white  hover:text-blue-700 transition rounded-md p-1' /></button>
              <button title='Nuevo remito' type='button' onClick={restaurarEstados}><AiOutlineClear className='w-6 h-6 bg-white  hover:text-red-500 transition rounded-md p-1'/></button>
              </div>
              <div className=''>
                <strong className='m-3'>Subtotal: </strong>
                { total &&
              parseFloat(total).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
              } <strong className='ml-3'>|</strong> <strong className='m-3'>Total con impuestos:</strong> { total &&(parseFloat(total)*1.21).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }</div>
            <button type='submit' className=' bg-slate-600 text-white font-normal p-3  mt-5 rounded-sm hover:bg-slate-700 transition' >Confirmar Datos</button>
              </form>
        </div>
          
          : <Printable setImprimir={setImprimir} datos={datos} reset={restaurarEstados} />
      }
    </>
  )
}
