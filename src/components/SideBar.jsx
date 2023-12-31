import { DataContext } from '../Contexts/DataContext';
import { useContext } from 'react';
import { AiOutlineClear as ClearIcon, AiOutlineCheckCircle as Confirm } from "react-icons/ai";
import { MdOutlineRestartAlt as Restart } from "react-icons/md";
import { HeadContext } from '../Contexts/HeadContext'

const opcionesDeFormato = {
  style: 'currency', // Indica que queremos formatearlo como moneda
  currency: 'ARS',   // Especifica la moneda como pesos argentinos (código 'ARS')
  minimumFractionDigits: 2 // Especifica la cantidad mínima de decimales
};


export default function SideBar() {
  const { total, limpiarMateriales, handleConfirm, totalImp } = useContext(DataContext)
  const { cliente, ubiIndex, infoHead, limpiarEncabezado, dolar, handleChangeDolar,  siguienteRemito, setDolar } = useContext(HeadContext)
  const { cuit, ubicacion, tel, numCliente } = infoHead 

  const nuevoRemito = () => {
    limpiarMateriales();
    siguienteRemito();
    setDolar(false)
  }

  return (
    <aside className='flex flex-col items-start justify-between bg-slate-100 text-black overflow-clip gap-4 p-1 h-full py-4'>
        <div className='flex flex-col text-sm  justify-around w-full gap-1.5 bg-white rounded-md p-4 shadow'>
          <h3 className='font-bold text-base w-full'>Resumen</h3>
          <h4><strong>Cliente: </strong> {cliente === 'default' ? '' : cliente}</h4>
          <h4><strong>CUIT:</strong> {cuit && cuit}</h4>
          <h4> <strong>Domicilio:</strong> {ubicacion && ubicacion[ubiIndex].direccion}</h4>
          <h4><strong>Localidad:</strong> {ubicacion && ubicacion[ubiIndex].localidad}</h4>
          <h4><strong>Teléfono:</strong> {tel && tel}</h4>
          <h4><strong>N° Cliente:</strong> {numCliente && numCliente}</h4>
          <div className='text-base p-1 flex flex-col gap-2'>
            <h4 className='p-2 bg-green-200 rounded-md'><strong>Total: </strong>{ parseFloat(total).toLocaleString('es-AR', opcionesDeFormato) }</h4>
            <h4 className='p-2 bg-green-200 rounded-md' ><strong>Total + IVA</strong>: { (parseFloat(totalImp)).toLocaleString('es-AR', opcionesDeFormato) }</h4>
          </div>
      </div>
      <section className="flex items-start flex-col gap-2 w-full shadow bg-white p-4 rounded-md">
        <h3 className='font-bold w-full'>Ajustes</h3>
          <div className='flex items-center'>    
            <input id="usar-codigos" defaultChecked={true} type="checkbox" value="" className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="usar-codigos" className="ml-2 select-none text-gray-900 dark:text-gray-300">Usar códigos</label>
          </div>
        <div className='flex items-center justify-center'>    
          <input id="fijar-fecha" type="checkbox" value="" className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="fijar-fecha" className="ml-2 select-none text-gray-900 dark:text-gray-300">Fijar fecha</label>   
        </div>
        <div className='flex items-center justify-center'>    
          <input id="print-header" defaultChecked={true} type="checkbox" value="" className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="print-header" className="ml-2 select-none text-gray-900 dark:text-gray-300">Imprimir Encabezado</label>   
        </div>
      </section>
      <section className='w-full flex flex-col bg-white p-4 rounded-md shadow'>
        <h3 className='font-bold w-full'>Control</h3>
        <div className='flex items-center  mt-1'>    
          <input checked={dolar} id="usar-dolar" type="checkbox" defaultValue={dolar} value={dolar} onChange={handleChangeDolar} className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="usar-dolar" className="ml-2 select-none text-gray-900 dark:text-gray-300">Dólar</label>
          </div>
        <div className='flex items-center gap-2 justify-between w-full my-2 text-md'>
          <button onClick={ nuevoRemito } className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-all">
          Siguiente
          </button>
          <button onClick={() => { limpiarEncabezado(); limpiarMateriales()}}  className=" transition-all text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Reiniciar
          </button>
        <button onClick={handleConfirm} className="transition-all text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          Confirmar
        </button>
        </div>
      </section>
    </aside>
  )
}
