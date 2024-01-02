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
      <div className='min-h-screen flex items-center justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className=' mb-10 rounded-md bg-white w-1/3 mx-auto  flex flex-col gap-3 p-10 items-center justify-center shadow'>
          <h1 className='text-left text-xl  font-medium m-4 border-b py-2 border-b-gray-400 w-64'>Nuevo proveedor:</h1>
          <label htmlFor="razon" className='max-w-sm mx-auto'>
            <span className='block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left'>Razon Social *</span>
            <input id='razon' autoFocus {...register('razon')} className=' w-64 p-2 bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition' required type="text" placeholder=''/>
          </label>
          <label htmlFor="razon" className='max-w-sm mx-auto'>
            <span className='block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left'>
              CUIT *
            </span>
            <input {...register('cuit')} className='w-64 p-2 bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition' required type="text" />
          </label>
          
          {
            fields.map(({ id }, index) => {
              return (
                <div className=' relative p-2  pt-0 rounded-md flex flex-col gap-3' key={id}>
                  <div className='  relative rounded-md flex flex-col gap-2 px-2'>
                    <label htmlFor="razon" className='max-w-sm mx-auto'>
                      <span className='block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left'>
                        Domicilio *
                      </span>
                      <input className='w-64 p-2 bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition' type="text" required {...register(`ubicacion.${index}.direccion`)}></input>
                    </label>
                    <label htmlFor="razon" className='max-w-sm mx-auto'>
                      <span className='block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left'>
                        Localidad *
                      </span>
                      <input className='w-64 p-2 bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition' type="text" required {...register(`ubicacion.${index}.localidad`)}></input>
                    </label>
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
          <button title='Agregar dirección y localidad' className='relative uppercase bottom-4 h-1 text-blue-600' type='button' onClick={() => append({})}><RiAddCircleFill className='inline w-6 h-6 bg-white rounded-full text-xl text-center border-white border-2' /></button>
          <div className='flex w-64 gap-3'>
            <label htmlFor="razon" className='w-[60%]'>
              <span className='block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left'>
                Teléfono
              </span>
              <input {...register('tel')} className=' w-full p-2 bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition' type="tel" />
            </label>
            <label htmlFor="razon" className='w-[40%]'>
              <span className='block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left'>
                N° Proveedor
              </span>
              <input {...register('numCliente')} className=' w-full p-2 bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition' type="tel" />
            </label>
          </div>
          <button type='submit' className='p-5 m-6 text-white w-64 font-medium transition ext-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' >Registrar</button>
        </form>
      </div>
    </div>
  )
}
