import React, { useEffect, useState } from 'react'
import ListaProveedores from './ListaProveedores'
import { obtenerObjetoProveedores } from './services/registrarProveedor';
import { formatear } from './services/formater';
import { useForm } from 'react-hook-form';


export default function Encabezado({register, getValues, setValue, setInfoHead}) {


  const [selected, setSelected] = useState(null);
  const [data, setData] = useState({});
  const [remito, setRemito] = useState('');
  const [ubiIndex, setUbiIndex] = useState('0');
  const [OC, setOC] = useState('');


  const handleSelect = (e) => {
    setSelected(e.target.value);
    setUbiIndex('0')
    setValue('head.ubiIndex', '0')
    setValue('head.empresa', e.target.value)
  }

  const handleUbi = (e) => {
    console.log(e.target.value);
    setUbiIndex(e.target.value);
    setValue('head.ubiIndex', e.target.value)
  }


  const handleBlur = (e) => {
    let newVal = formatear(getValues('head.remito'));
    setValue('head.remito',newVal);
  }
  
  useEffect(() => { 
    const provs = obtenerObjetoProveedores(selected);
    if (provs != null) {
      setInfoHead(provs);
      setData(provs);
    }

  }, [selected])

  useEffect(() => {
      setValue('head.fecha', new Date().toISOString().split('T')[0])
  }, []) 

  
  console.log(ubiIndex);

  return (
    <div className=' container text-black flex flex-col justify-center items-center gap-4'>
      <div className='flex justify-center items-center gap-5'>
        <ListaProveedores register={register} handle={handleSelect} />
        <label>Ubicación: </label>
        <select className='p-1 m-1 bg-white rounded-sm w-52' {...register('head.ubiIndex')} onChange={handleUbi}>{data.ubicacion && data.ubicacion.map((ubi, index) => {
          return <option  value={index} key={ubi.localidad}>{ubi.localidad}, {ubi.direccion}</option>
        })}</select>
        <input type="date" {...register('head.fecha')} />
        <input  {...register('head.remito')} className=' w-32 p-1 m-1 text-base rounded-sm' onClick={() => {setRemito('')}} onBlur={handleBlur} type="text" placeholder='Remito N°' />
        <input {...register('head.OC')} className='p-1 m-1 rounded-sm w-36' type="text" placeholder='Orden de Compra' />
      </div>

      <div className='flex items-center  justify-around  p-1 w-full gap-5'>
        <h4> <strong>Domicilio:</strong> {data.ubicacion && ubiIndex && data.ubicacion[ubiIndex].direccion}</h4>
        <h4><strong>Localidad:</strong> {data.ubicacion && ubiIndex && data.ubicacion[ubiIndex].localidad}</h4>
        <h4><strong>CUIT:</strong> {data.cuit && data.cuit}</h4>
        <h4><strong>Teléfono:</strong> {data.tel && data.tel}</h4>
        <h4><strong>N° Cliente:</strong> {data.numCliente && data.numCliente}</h4>
      </div>
    </div>
  )
}
