import React, { useEffect } from 'react'
import './stylesheets/Printable.css'
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import moment from 'moment';


export default function Printable({ datos, setImprimir }) {
  const dataArray = Object.keys(datos).slice(1);
  console.log(dataArray);
  console.log(dataArray);
  const { head } = datos;
  const { data, ubiIndex } = head;

  const [fecha, setFecha] = useState(' ')

  useEffect(() => {
    const fechaArgentina = moment(head.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY');
    setFecha(fechaArgentina);
  },[])

  const compRef = useRef();

  return (
    <>
      <div className='CONT'>
        <div className='flex flex-col gap-5 absolute left-12 top-20 text-white z-40' >
          <ReactToPrint trigger={() => <button className='p-3 rounded-md big font-medium hover:bg-blue-800 bg-blue-600 transition'>Imprimir</button>} content={() => compRef.current} />
          <button type='button' className=' flex items-center justify-center gap-2 p-3 rounded-md big font-medium  hover:bg-green-800 bg-green-600 transition' onClick={ () => setImprimir(false)}> <IoIosArrowBack className=' inline'/> Editar remito</button>
        </div>
        <div className='Sheet2' ref={compRef}>
          <div className='text-black Sheet'>
          <header className='Encabezado'>
            <section className='Emisor'>
              <span className='Fecha'>{fecha}</span>
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
                  <span className='OC'>{head.OC}</span>
                </div>
            </section>
          </header>
            <table className='Materiales'>
              {
                dataArray.map(cod => {
                  return (<div key={cod}>
                    <tr className='Item'>
                      <td className='Cantidad'>{datos[cod].cantidad}</td>
                      <td className='DescCode'>{datos[cod].codigo} {datos[cod].descripcion} </td>
                    </tr>
                  </div>)
                })
              }
          </table>
          </div>
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
                  <span className='OC'>{head.OC}</span>
                </div>
            </section>
          </header>
            <table className='Materiales'>
              {
                dataArray.map(cod => {
                  return (<div key={cod}>
                    <tr className='Item'>
                      <td className='Cantidad'>{datos[cod].cantidad}</td>
                      <td className='DescCode'>{datos[cod].codigo} {datos[cod].descripcion} </td>
                    </tr>
                  </div>)
                })
              }
          </table>
        </div>
      </div>
      
      </div>
      </>
      
  )
}
