import { Link } from 'react-router-dom'
import logo from "/logo.png"
import { saveAs } from 'file-saver';
import { MdOutlineSimCardDownload } from "react-icons/md";

export default function MainMenu() {

  const saveLocalStorage = () => {
    const materials = {};
    for (let key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        let value = localStorage.getItem(key);
        materials[key] = value
      }
    }
    const materialsText = JSON.stringify(materials, null, 2);
    
    const blob = new Blob([materialsText], { type: 'text/plain;charset=utf-8' });

    saveAs(blob, 'materials.txt');
  }
  
  return (
    <nav className="relative w-screen flex bg-gray-100 items-center justify-center flex-col text-center h-screen">
      <div className='relative w-1/3 my-12 rounded-md bg-white shadow-md flex items-center justify-around p-12 flex-col text-center h-screen'>
        <img src={logo} alt="logo" />
        <div className='flex flex-col gap-8 w-full justify-center items-center'>
          <Link className='p-8  w-[60%] rounded-lg font-medium transition text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' to='/proveedores'>Agregar proovedor</Link>
          <Link className='p-8 w-[60%] font-medium transition ext-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' to='/remitir'>Remitir</Link>
        </div>
        <button title='Descargar archivo materiales' onClick={saveLocalStorage} className='absolute right-0 bottom-0 m-4 p-1 rounded-lg font-medium transition text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
          <MdOutlineSimCardDownload />
        </button>
      </div>
    </nav>
  )
}
