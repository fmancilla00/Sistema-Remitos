import React, { useEffect } from 'react'
import './stylesheets/Printable.css'
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

export default function Printable({ datos, setImprimir }) {
  const dataArray = Object.keys(datos).slice(1);
  const { head } = datos;
  const { data, ubiIndex } = head;

  const [fecha, setFecha] = useState(' ')

  const generarPDF = (head) => {
    let doc = new jsPDF();
    const dataArray = Object.keys(datos).slice(1);
    // Agregar contenido al documento
    console.log(head);
    const ubiIndex = head.ubiIndex;
    doc.setFontSize(14);
    doc.text('Razon Social: ' + head.data.razon, 10, 20)
    doc.text('OC: ' + head.OC, 10, 30)
    doc.text('Domicilio: ' + head.data.ubicacion[ubiIndex].direccion, 10, 40)
    doc.text('Localidad: ' + head.data.ubicacion[ubiIndex].localidad, 10, 50)
    doc.text(head.remito, 150, 20)
    doc.setFontSize(11);
    doc.text(moment(head.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY'), 150, 30 )
    for (let i = 0; i < dataArray.length; i++) { 
      doc.text(datos[dataArray[i]].cantidad, 10, 70 + (i * 10))
      doc.text(datos[dataArray[i]].codigo, 25, 70 + (i * 10))
      doc.text(datos[dataArray[i]].descripcion, 55, 70 + (i * 10))
      doc.text(datos[dataArray[i]].precio, 170, 70 + (i*10))
    }
    
    // Convertir el documento a Blob
    doc.save(head.remito);
  }

  useEffect(() => {
    const fechaArgentina = moment(head.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY');
    setFecha(fechaArgentina);
  },[])

  const compRef = useRef();

  return (
    <>
      
      <div id='caja' className='CONT'>
        <div className='flex flex-col gap-5 absolute left-12 top-20 text-white z-40' >
          <ReactToPrint  trigger={() => <button className='p-3 rounded-md big font-medium hover:bg-blue-800 bg-blue-600 transition'>Imprimir</button>} content={() => compRef.current} />
          <button className='text-black' onClick={() => {generarPDF(head, ubiIndex, datos)}}>Ver</button>
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
