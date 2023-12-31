import React, { useContext, useEffect, useState, useRef } from 'react'
import Material from './Material'
import { BiAddToQueue } from "react-icons/bi";
import Encabezado from './Encabezado';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { DataContext } from '../Contexts/DataContext';
import Entrada from './Entrada'
import Header from './Header';
import SideBar from './SideBar';
import ListaMateriales from './ListaMateriales'
import Tabla from './Tabla'

export default function Form() {
  const { agregarMaterial, mats } = useContext(DataContext);

  const refMateriales = useRef(null)
  
  useEffect(() => {
    refMateriales.current.scrollTop = refMateriales.current.scrollHeight
  }
    , [mats])
  

  return (
    <div className='h-screen bg-gray-100 p-4'>
      <div className='flex justify-between gap-4 h-full'>  
        <div className="flex-col w-3/4 p-4 h-full">
          <header className='w-full flex justify-between items-center relative h-[10%] mb-2'>
            <Link title="Volver" to='/' className='hover:scale-110 transition text-2xl text-slate-800' ><BsFillArrowLeftCircleFill /></Link>
            <Encabezado className="" />
          </header>
          <div className='w-full flex flex-col items-centerjustify-between h-[90%] gap-6'>
            <Tabla ref={refMateriales} />
            <Entrada  addMat={agregarMaterial} />
            </div>
        </div>
        <aside className='w-1/4'>
          <SideBar /> 
        </aside>
      </div>
    </div>
  )
}
