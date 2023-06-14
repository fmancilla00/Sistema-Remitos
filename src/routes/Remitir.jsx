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
    <Form setElementos={setElementos} setImprimir={setImprimir} />
  )
}
