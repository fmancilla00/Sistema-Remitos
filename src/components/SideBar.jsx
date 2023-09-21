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
    <aside className='flex flex-col items-start justify-between bg-slate-100 text-black shadow-slate-400  shadow w-1/5 h-screen p-3 z-10 py-5 overflow-clip'>
        <div className='flex flex-col text-sm  justify-around w-full gap-1.5'>
        <h3 className='font-bold p-1 text-base bg-slate-300 w-full'>Resumen</h3>
          <h4><strong>Cliente: </strong> {cliente === 'default' ? '' : cliente}</h4>
          <h4><strong>CUIT:</strong> {cuit && cuit}</h4>
          <h4> <strong>Domicilio:</strong> {ubicacion && ubicacion[ubiIndex].direccion}</h4>
          <h4><strong>Localidad:</strong> {ubicacion && ubicacion[ubiIndex].localidad}</h4>
          <h4><strong>Teléfono:</strong> {tel && tel}</h4>
          <h4><strong>N° Cliente:</strong> {numCliente && numCliente}</h4>
        <div className='text-base bg-green-200 p-1'>
          <h4><strong>Total: </strong>{ parseFloat(total).toLocaleString('es-AR', opcionesDeFormato) }</h4>
          <h4 ><strong className='underline'>Total + IVA</strong>: { (parseFloat(totalImp)).toLocaleString('es-AR', opcionesDeFormato) }</h4>
        </div>
      </div>
      <section className="flex items-start flex-col mb-4 gap-2 w-full">
        <h3 className='font-bold p-1 bg-slate-200 w-full'>Ajustes</h3>
          <div className='flex'>    
            <input id="usar-codigos" defaultChecked={true} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="usar-codigos" className="ml-2 select-none text-sm font-medium text-gray-900 dark:text-gray-300">Usar códigos</label>
          </div>
        <div className='flex items-start justify-center'>    
          <input id="fijar-fecha" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="fijar-fecha" className="ml-2 select-none text-sm font-medium text-gray-900 dark:text-gray-300">Fijar fecha</label>   
        </div>
        <div className='flex items-start justify-center'>    
          <input id="print-header" defaultChecked={true} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="print-header" className="ml-2 select-none text-sm font-medium text-gray-900 dark:text-gray-300">Imprimir Encabezado</label>   
        </div>
      </section>
      <section className='w-full flex flex-col gap-2'>
        <h3 className='font-bold p-1 bg-slate-200 w-full'>Control</h3>
        <div className='flex items-center  mt-1'>    
          <input checked={dolar} id="usar-dolar" type="checkbox" defaultValue={dolar} value={dolar} onChange={handleChangeDolar} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="usar-dolar" className="ml-2 select-none text-base font-medium text-gray-900 dark:text-gray-300">Dólar</label>
          </div>
        <div className='flex items-center gap-2 justify-between w-full my-2 text-md'>
          <button onClick={ nuevoRemito } className="rounded relative inline-flex group items-center justify-center px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-amber-600 active:shadow-none shadow-lg bg-gradient-to-tr from-amber-600 to-amber-500 border-amber-700 text-white gap-1 text-sm">
          Limpiar <ClearIcon/>
          </button>
          <button onClick={() => { limpiarEncabezado(); limpiarMateriales()}}  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-red-600 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 border-red-700 text-white gap-1 text-sm">
          Reiniciar <Restart/>
          </button>
        </div>
        <button onClick={handleConfirm} className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 cursor-pointer border-b-4 border-l-2 active:teal-red-600 active:shadow-none shadow-lg bg-gradient-to-tr from-teal-600 to-teal-500 border-teal-700 text-white gap-1 w-full h-14 text-lg">
        Confirmar <Confirm />
        </button>
      </section>
    </aside>
  )
}
