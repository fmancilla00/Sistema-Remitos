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
import { Link } from 'react-router-dom';
import { IoTrash } from "react-icons/io5";
import { IoMdPrint } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { MdSave } from "react-icons/md";



export default function Printable({ datos, setImprimir, reset }) {
  const { head } = datos;
  const { data, ubiIndex } = head;

  const [fecha, setFecha] = useState(' ');
  const [guardado, setGuardado] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  

  useEffect(() => { 
    setDataArray(Object.keys(datos).slice(1))
  },[datos])

  const generarPDF = (head) => {
    let doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Razon Social: ' + head.data.razon, 10, 20)
    doc.text('OC: ' + head.OC, 10, 30)
    doc.text('Domicilio: ' + head.data.ubicacion[ubiIndex].direccion, 10, 40)
    doc.text('Localidad: ' + head.data.ubicacion[ubiIndex].localidad, 10, 50)
    doc.text(head.remito, 150, 20)
    doc.setFontSize(11);
    doc.text(moment(head.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY'), 150, 30 )
    for (let i = 0; i < dataArray.length; i++) { 
      if (datos[dataArray[i]]) {
        doc.text(datos[dataArray[i]].cantidad, 10, 70 + (i * 10))
      doc.text(datos[dataArray[i]].codigo, 25, 70 + (i * 10))
      doc.text(datos[dataArray[i]].descripcion, 55, 70 + (i * 10))
      doc.text(datos[dataArray[i]].precio, 170, 70 + (i*10))
      }
    }
    
    // Convertir el documento a Blob
    doc.save(head.remito);
  }

  useEffect(() => {
    const fechaArgentina = moment(head.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY');
    setFecha(fechaArgentina);
  },[])

  console.log(datos);
  const compRef = useRef();

  return (
    <>
      <div id='caja' className='CONT'>
        <div className='flex flex-col gap-5 absolute right-60 bg-slate-200 rounded-md p-10 top-20 text-white z-40' >
          <button title="Volver" to='/' onClick={() => { reset(); setImprimir(false) }} className=' flex items-center justify-center p-3 rounded-md big font-medium hover:bg-red-800 bg-red-600 transition' > <VscDebugRestart className=' mr-1'/>Nuevo remito</button>
          {!guardado
            ?
            <button className='flex items-center justify-center p-3 rounded-md big font-medium hover:bg-blue-800 bg-blue-600'
              onClick={() => { generarPDF(head, ubiIndex, datos); setGuardado(true) }}>
              <MdSave className='mr-1'/>Guardar PDF
            </button>
            :
            <ReactToPrint  trigger={() => <button className=' flex items-center justify-center gap-2 p-3 rounded-md big font-medium hover:bg-blue-800 bg-blue-600 transition'> <IoMdPrint/>Imprimir</button>} content={() => compRef.current} />
          }
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
                      {
                        (datos[cod].cantidad) ?
                          <>
                            <td className='Cantidad'>{datos[cod].cantidad}</td>
                            <td className='DescCode'>{datos[cod].codigo} {datos[cod].descripcion} </td>
                          </>
                          : <div className='vacio'> </div>
                      }
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
