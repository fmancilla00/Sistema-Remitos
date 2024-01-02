import { Link } from 'react-router-dom'
import logo from "/logo.png"

export default function MainMenu() {
  return (
    <nav className="w-screen flex bg-gray-100 items-center justify-center flex-col text-center h-screen">
      <div className=' w-1/3 my-12 rounded-md bg-white shadow-md flex items-center justify-around p-12 flex-col text-center h-screen'>
        <img src={logo} alt="logo" />
        <div className='flex flex-col gap-8 w-full justify-center items-center'>
          <Link className='p-8  w-[60%] rounded-lg font-medium transition text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' to='/proveedores'>Agregar proovedor</Link>
          <Link className='p-8 w-[60%] font-medium transition ext-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' to='/remitir'>Remitir</Link>
        </div>
      </div>
    </nav>
  )
}
