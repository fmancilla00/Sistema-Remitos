import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavMenu() {
  return (
    <nav className="flex align-middle justify-center gap-5">
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "bg-green-300" : ""
        }
        to='/remitir'>
        Remitir
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "bg-green-300": ""
        }
        to='/'>Menu</NavLink>
      <NavLink
        to='/proveedores'
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "bg-green-300" : ""
        }>
        Proveedores
      </NavLink>
    </nav>
  )
}
