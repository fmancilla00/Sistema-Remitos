import React, { useEffect, useState } from 'react'
import ListaProveedores from './ListaProveedores'
import { obtenerObjetoProveedores } from './services/registrarProveedor';
import { formatear } from './services/formater';
import { useForm } from 'react-hook-form';

export default function Encabezado({ setInfo}) {


  const [selected, setSelected] = useState(null);
  const [data, setData] = useState({});
  const [remito, setRemito] = useState('');
  const [ubiIndex, setUbiIndex] = useState('0');
  const [OC, setOC] = useState('');

  const handleSelect = (e) => {
    setSelected(e.target.value);
  }

  const handleUbi = (e) => {
    console.log(e.target.value);
    setUbiIndex(e.target.value);
  }

  const handleChange = (e) => {
    setRemito(e.target.value)
  }

  const handleBlur = (e) => {
    let newVal = formatear(e.target.value);
    setRemito(newVal);
    setInfo(
      {
        data: data,
        remito: remito,
        ubiIndex: ubiIndex,
        OC: OC
      })
  }
  
  useEffect(() => { 
    const provs = obtenerObjetoProveedores(selected);
    if (provs != null) {
      setData(provs);
    }

  }, [selected])

  const setStatus = () => { 
    setInfo(
      {
        data: data,
        remito: remito,
        ubiIndex: ubiIndex,
        OC: OC
      })
  }

  useEffect( 
    () => { 
      setInfo(
      {
        data: data,
        remito: remito,
        ubiIndex: ubiIndex,
        OC: OC
      })
    }
    , [data, ubiIndex]) 
  
  console.log(ubiIndex);

  return (
    <div className=' container text-black flex flex-col justify-center items-center gap-4'>
      <form className='flex justify-center items-center gap-5'>
        <ListaProveedores handle={handleSelect} />
        <input  className=' w-32 p-1 m-1 text-base rounded-sm' onClick={() => {setRemito('')}} onBlur={handleBlur} onChange={handleChange} value={remito} type="text" placeholder='Remito N°' />
        <input onBlur={setStatus} onChange={(e) => setOC(e.target.value)} value={OC} className='p-1 m-1 rounded-sm w-36' type="text" placeholder='Orden de Compra' />
        <label >Ubicacion</label>
        <select onBlur={setStatus} onChange={handleUbi}>{data.ubicacion && data.ubicacion.map((ubi, index) => {
          return <option value={index} key={ubi.localidad}>{ubi.localidad}, {ubi.direccion}</option>
        })}</select>
      </form>

      <div className='flex items-center justify-center gap-5'>
        <h4>Domicilio {data.ubicacion && ubiIndex && data.ubicacion[ubiIndex].direccion}</h4>
        <h4>Localidad {data.ubicacion && ubiIndex && data.ubicacion[ubiIndex].localidad}</h4>
        <h4>CUIT: {data.cuit && data.cuit}</h4>
        <h4>Teléfono: {data.tel && data.tel}</h4>
        <h4>N° Cliente: {data.numCliente && data.numCliente}</h4>
      </div>
      <button>Provs</button>
    </div>
  )
}
