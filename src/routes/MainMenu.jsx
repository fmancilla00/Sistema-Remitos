import React from 'react'
import { Link } from 'react-router-dom'
import NavMenu from '../components/NavMenu'
import logo from "../../public/logo.png"

export default function MainMenu() {
  return (
    <nav className="w-screen flex  gap-10 items-center justify-center flex-col text-center h-screen">
      <img src={logo} alt="logo" />
      <Link className='p-8 bg-slate-600 w-64  rounded-md font-medium hover:bg-slate-800 transition' to='/proveedores'>Agregar proovedor</Link>
      <Link className='p-8 bg-slate-600 w-64 rounded-md font-medium hover:bg-slate-800 transition' to='/remitir'>Remitir</Link>
    </nav>
  )
}
