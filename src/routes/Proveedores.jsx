import React, { useEffect } from 'react'
import NavMenu from '../components/NavMenu'
import { useFieldArray, useForm } from 'react-hook-form'
import { registrarProovedor } from '../components/services/registrarProveedor';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { RiAddCircleFill } from "react-icons/ri";


export default function Proveedores() {

  const { register, handleSubmit, reset, control } = useForm({ mode: 'all' }); 

  const { fields, append, remove } = useFieldArray({ control, name: 'ubicacion' })
  
  useEffect(() => {
    append({})
    remove(1);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    registrarProovedor(data);
    reset();
  }

  


  return (
    <div className='min-h-screen text-gray-900 flex align-middle justify-center flex-col text-center'>

      <Link to='/' title="Volver" className=' hover:-translate-x-0.5 transition absolute top-0 left-0 m-6 text-3xl' ><BsFillArrowLeftCircleFill/></Link>
      <h1 className='text-xl font-bold m-6'>Nuevo proveedor:</h1>
      <div className=''>
        <form onSubmit={handleSubmit(onSubmit)} className=' mb-10 rounded-md bg-slate-400 w-96 mx-auto text-slate-700 flex flex-col gap-5 p-10 items-center justify-center'>
          <input autoFocus {...register('razon')} className=' w-64 p-2 rounded-sm' required type="text" placeholder='Razon Social *'/>
          <input {...register('cuit')} className=' w-64 p-2 rounded-sm' required type="text" placeholder='CUIT *' />
          {
            fields.map(({ id }, index) => {
              return (
                <div className=' relative p-2  pt-0 rounded-md flex flex-col gap-2' key={id}>
                  <div className='  relative rounded-md flex flex-col gap-2 px-2'>
                    <input className='p-2 w-64' placeholder='Domicilio *' type="text" required {...register(`ubicacion.${index}.direccion`)}></input>
                    <span className='absolute w-1 h-6 inline-block top-1/3 z-0 left-1/2 right-1/2 bg-white text-white'></span>
                    <input className='p-2 w-64' placeholder='Localidad *' type="text" required {...register(`ubicacion.${index}.localidad`)}></input>
                  </div>
                  {
                    fields.length > 1
                    ? <button title='Eliminar' className=' text-red-400 absolute w-10 h-2 top-7 left-72 text-xl inline mx-auto text-center' type='button'
                    onClick={() => { fields.length >1 ? remove(index) : console.log('no podes'); }}>
                    <TiDelete className=' w-6 h-6 bg-white rounded-full text-4xl text-center' /></button>
                : undefined
              }
              </div>
                  
                  )
                })
              }
              <button title='Agregar dirección y localidad' className='relative uppercase bottom-4 h-1 text-blue-600' type='button' onClick={() => append({})}><RiAddCircleFill className='inline w-6 h-6 bg-white rounded-full text-xl text-center border-white border-2'/></button>
              <input {...register('tel')} className=' w-64 p-2' type="tel" placeholder='Teléfono' />
              <input {...register('numCliente')} className=' w-64 p-2' type="tel" placeholder='N° Proveedor' />
          <button type='submit' className='p-3 hover:bg-cyan-900 bg-cyan-800 text-white w-64 font-medium uppercase rounded-sm transition' >Registrar</button>
        </form>
      </div>
    </div>
  )
}
