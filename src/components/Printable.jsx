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


export default function Printable() {
  
  const { datos, ubiIndex, infoHead, reiniciarRemito, ids } = useContext(DataContext);
  const { head } = datos;

  const [guardado, setGuardado] = useState(false);

  const compRef = useRef();

  return (
    <>
      <div id='caja' className='CONT'>
        <div className='flex flex-col gap-5 absolute right-60 bg-slate-200 rounded-md p-10 top-20 text-white z-40' >
          <Link title="Volver" to='/remitir' onClick={reiniciarRemito} className=' flex items-center justify-center p-3 rounded-md big font-medium hover:bg-red-800 bg-red-600 transition' > <VscDebugRestart className=' mr-1'/>Nuevo remito</Link>
          {!guardado
            ?
            <button className='flex items-center justify-center p-3 rounded-md big font-medium hover:bg-blue-800 bg-blue-600'
              onClick={() => { generarPDF({head, infoHead, datos, ids, ubiIndex}); setGuardado(true) }}>
              <MdSave className='mr-1'/>Guardar PDF
            </button>
            :
            <ReactToPrint  trigger={() => <button className=' flex items-center justify-center gap-2 p-3 rounded-md big font-medium hover:bg-blue-800 bg-blue-600 transition'> <IoMdPrint/>Imprimir</button>} content={() => compRef.current} />
          }
          <Link to='/remitir' className=' flex items-center justify-center gap-2 p-3 rounded-md big font-medium  hover:bg-green-800 bg-green-600 transition'> <IoIosArrowBack className=' inline'/> Editar remito</Link>
        </div>
        <div className='Sheet2' ref={compRef}>
          <Sheet dataArray={ids} />
          <Sheet dataArray={ids} />
         </div>
        </div>
      </>
      
  )
}
