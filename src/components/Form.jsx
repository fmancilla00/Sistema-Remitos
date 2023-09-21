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
    <div className='flex items-center relative w-full min-h-screen'>
      <div className="h-screen relative flex items-center justify-start flex-col text-center w-full">
        <Link title="Volver" to='/' className=' hover:scale-110 transition absolute top-2 -left-2 m-6 text-2xl text-slate-800' ><BsFillArrowLeftCircleFill /></Link>
        <div className=' h-screen w-full flex flex-col items-center'>
          <Encabezado className="" />
          <div className='w-5/6 flex flex-col items-center justify-center'>
            <Header />
            <ListaMateriales ref={refMateriales} />
            <Entrada addMat={agregarMaterial} />
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  )
}
