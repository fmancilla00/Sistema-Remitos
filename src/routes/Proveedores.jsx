import React from 'react'
import NavMenu from '../components/NavMenu'
import { useFieldArray, useForm } from 'react-hook-form'
import { registrarProovedor } from '../components/services/registrarProveedor';

export default function Proveedores() {

  const { register, handleSubmit, reset, control } = useForm({ mode: 'all' }); 
  
  const { fields, append, remove } = useFieldArray({control, name: 'ubicacion'})

  const onSubmit = (data) => {
    console.log(data);
    registrarProovedor(data);
    reset();
  }


  return (
    <div className='flex align-middle justify-center flex-col text-center'>
      <div>Proveedores</div>
      <NavMenu />

      <div className=''>
        <form onSubmit={handleSubmit(onSubmit)} className='  text-slate-700 flex flex-col gap-5 p-10 items-center justify-center'>
          <input {...register('razon')} className=' w-64 p-2' required type="text" placeholder='Razon Social'/>
          <input {...register('cuit')} className=' w-64 p-2' required type="number" placeholder='Cuit' />
          <input {...register('dir')} className=' w-64 p-2' required type="text" placeholder='Dirección' />
          <input {...register('tel')} className=' w-64 p-2' type="tel" placeholder='Teléfono' />
          <input {...register('numCliente')} className=' w-64 p-2' type="tel" placeholder='N° Cliente' />
          <input {...register('loc')} className=' w-64 p-2' type="text" placeholder='Localidad' />
          {
            fields.map(({ id }, index) => {
              return (
                <div className='flex gap-2' key={id}>
                  <input placeholder='Domicilio' type="text" {...register(`ubicacion.${index}.direccion`)}></input>
                  <input placeholder='Localidad' type="text" {...register(`ubicacion.${index}.localidad`)}></input>
                  <button type='button' onClick={() => remove(index)}>Borrar</button>
                </div>
              )
            })
          }
          <button type='button' onClick={() => append({})}>add</button>
          <button type='submit'>Registrar</button>
        </form>
      </div>
    </div>
  )
}
