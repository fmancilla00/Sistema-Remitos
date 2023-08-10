import React, { useContext, useEffect, useState, useRef } from 'react'
import Material from './Material'
import { BiAddToQueue } from "react-icons/bi";
import Encabezado from './Encabezado';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { DataContext } from '../Contexts/DataContext';
import Entrada from './Entrada'
import Item from './Item';
import Header from './Header';
import SideBar from './SideBar';
import ListaMateriales from './ListaMateriales'

export default function Form() {
  const { agregarMaterial, mats, total, infoHead, ubiIndex, handleSubmit, procesarDatos } = useContext(DataContext);

  const refMateriales = useRef(null)

  useEffect(() => {
    refMateriales.current.scrollTop = refMateriales.current.scrollHeight
  }
    , [mats])

  return (
    <div className='flex items-center'>
      <div className="  min-h-screen relative flex items-center justify-start flex-col text-center w-5/6">
        <Link title="Volver" to='/' className=' hover:scale-110 transition absolute top-2 -left-2 m-6 text-2xl text-slate-800' ><BsFillArrowLeftCircleFill /></Link>
        <Encabezado className="" />
        <Header />
        <ListaMateriales ref={refMateriales} />
        <Entrada addMat={agregarMaterial} />
      </div>
      <SideBar />
    </div>
  )
}
