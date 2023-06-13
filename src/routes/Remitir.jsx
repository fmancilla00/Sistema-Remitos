import React from 'react'
import Encabezado from '../components/Encabezado'
import Form from '../components/Form'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Printable from '../components/Printable';



  
export default function Remitir() {
  const [elementos, setElementos] = useState({});
  const [info, setInfo] = useState({})
  const [imprimir, setImprimir] = useState(false)
  const goToPrint = () => { 
    window.print();
  }

  return (
    !imprimir
      ?
        <div className=" relative flex align-middle justify-center flex-col text-center py-12 px-8">
          <Link to='/' className='absolute top-0 left-0 m-2' ><BsFillArrowLeftCircleFill/></Link>
        <Encabezado setInfo={setInfo} />
          <Form setElementos={setElementos} setImprimir={setImprimir} />
      </div>
      :
      <Printable elementos={elementos} info={info} setImprimir={setImprimir} />
  )
}
