import React from 'react'
import './stylesheets/Printable.css'
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';

export default function Printable({ elementos, info, setImprimir }) {
  const dataArray = Object.keys(elementos);
  const { data, remito, ubiIndex, OC } = info;
  console.log(data);
  console.log(ubiIndex);

  const compRef = useRef();

  return (
      <>
      <div>
        <ReactToPrint trigger={() => <button className='absolute right-40 text-black z-40'>Imprimir</button>} content={ () => compRef.current}/>
      </div>
        <div className='Sheet2' ref={compRef}>
        <div className='text-black Sheet'>
        <header className='Encabezado'>
          <section className='Emisor'>
            <span className='Fecha'>12/06/2022</span>
          </section>  
          <section className='Receptor'>
              <span className='Razon'>{data.razon}</span> 
              <div className='TelDom'>
                <span className='Domicilio'>{data.ubicacion && ubiIndex && data.ubicacion[ubiIndex].direccion}</span>
                <span className='Telefono'>{data.tel && data.tel}</span>
              </div>
              <span className='Localidad'>{data.ubicacion && ubiIndex && data.ubicacion[ubiIndex].localidad}</span>
          </section>
            <section className='Info'>
              <div className='Info-1'>
                <span>Responsable Inscripto</span>
                <span className='CUIT'>{data.cuit && data.cuit}</span>
              </div>
              <div className='Info-2'>
                <span className='numCliente'>{data.numCliente && data.numCliente}</span>
                <span className='OC'>{OC}</span>
              </div>
          </section>
        </header>
          <table className='Materiales'>
            {
              dataArray.map(cod => {
                return (<div key={cod}>
                  <tr className='Item'>
                    <td className='Cantidad'>{elementos[cod].cantidad}</td>
                    <td className='DescCode'>{elementos[cod].codigo} {elementos[cod].descripcion} </td>
                  </tr>
                </div>)
              })
            }
        </table>
        </div>
        <div className='text-black Copia'>
            <div className='flex items-center justify-center gap-5'>
              <span>12/06/2022</span>
              <span>Domicilio {data.ubicacion && ubiIndex && data.ubicacion[ubiIndex].direccion}</span>
              <span>Localidad {data.ubicacion && ubiIndex && data.ubicacion[ubiIndex].localidad}</span>
              <span>CUIT: {data.cuit && data.cuit}</span>
              <span>Teléfono: {data.tel && data.tel}</span>
              <span>N° Cliente: {data.numCliente && data.numCliente}</span>
              <span>{OC}</span>
            </div>
            {
              dataArray.map(cod => {
                return (<div key={cod}>
                  <span>{elementos[cod].cantidad}</span>
                  <span>{elementos[cod].codigo}</span>
                  <span>{elementos[cod].descripcion}</span>
                </div>)
              })
            }
        </div>
      </div>
      </>
      
  )
}
