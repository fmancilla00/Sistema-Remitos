import React from 'react'
import { Link } from 'react-router-dom'
import NavMenu from '../components/NavMenu'

export default function MainMenu() {
  return (
    <nav className="flex align-middle justify-center flex-col text-center">
      <Link className='p-10 hover:text-green-500' to='/proveedores'>Agregar proovedor</Link>
      <Link className='p-10 hover:text-green-500' to='/remitir'>Remitir</Link>
    </nav>
  )
}
