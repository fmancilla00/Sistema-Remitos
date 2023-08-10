import React, { useContext, useEffect } from 'react'
import './stylesheets/Printable.css'
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { IoMdPrint } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { MdSave } from "react-icons/md";
import { DataContext } from '../Contexts/DataContext.jsx';
import { Link } from 'react-router-dom';
import Sheet from './Sheet';
import { generarPDF } from './services/makePdf';
import { HeadContext } from '../Contexts/HeadContext';


export default function Printable() {
  
  const { limpiarMateriales, ids, mats, handleConfirm } = useContext(DataContext)
  const { limpiarEncabezado, ubiIndex, infoHead, remito, OC, fecha, dolar } = useContext(HeadContext)

  const [guardado, setGuardado] = useState(false);

  const compRef = useRef();

  return (
    <>
      <div id='caja' className='CONT'>
        <div className='flex flex-col gap-5 absolute right-60 bg-slate-200 rounded-md p-10 top-20 text-white z-40' >
          <Link title="Volver" to='/remitir' onClick={() => { limpiarMateriales(); limpiarEncabezado(); handleConfirm()}} className=' flex items-center justify-center p-3 rounded-md big font-medium hover:bg-red-800 bg-red-600 transition' > <VscDebugRestart className=' mr-1'/>Nuevo remito</Link>
          {!guardado
            ?
            <button className='flex items-center justify-center p-3 rounded-md big font-medium hover:bg-blue-800 bg-blue-600'
              onClick={() => { generarPDF({infoHead, OC, remito, fecha, mats, ubiIndex, dolar}); setGuardado(true) }}>
              <MdSave className='mr-1'/>Guardar PDF
            </button>
            :
            <ReactToPrint  trigger={() => <button className=' flex items-center justify-center gap-2 p-3 rounded-md big font-medium hover:bg-blue-800 bg-blue-600 transition'> <IoMdPrint/>Imprimir</button>} content={() => compRef.current} />
          }
          <button type='button' onClick={handleConfirm}  className=' flex items-center justify-center gap-2 p-3 rounded-md big font-medium  hover:bg-green-800 bg-green-600 transition'> <IoIosArrowBack className=' inline'/> Editar remito</button>
        </div>
        <div className='Sheet2' ref={compRef}>
          <Sheet dataArray={ids} />
          <Sheet dataArray={ids} />
         </div>
        </div>
      </>
      
  )
}
