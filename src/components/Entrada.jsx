import { ChangeEvent, FormEvent, useState} from "react";
import { BiSolidSend } from "react-icons/bi";
import { useRef } from "react";
import { FiEdit3, FiSave } from "react-icons/fi"
import { BsDatabaseCheck, BsDatabaseDash } from "react-icons/bs";
import { useContext } from "react"
import { DataContext } from '../Contexts/DataContext'

export default function Entrada({ addMat }) {
  const [cantidad, setCantidad] = useState('')
  const [codigo, setCodigo] = useState('')
  const [desc, setDesc] = useState('')
  const [precio, setPrecio] = useState('')
  const [store, setStore] = useState(false)
  const [iva, setIva] = useState('21')

  const inputRef = useRef(null)
  const precioRefEntry = useRef(null)

  const { updateMats } = useContext(DataContext)

  const guardarItem = () => { 
    if (codigo) {
      localStorage.setItem(codigo, desc)
    }
  }

  const handleSubmitPersonal = (e) => {
    e.preventDefault()
    addMat(cantidad, codigo, desc, precio, iva)
    setCantidad('')
    setCodigo('')
    setDesc('')
    setPrecio('')
    setStore(false)
    setIva('21')
    if (store && codigo) {
      guardarItem()
      updateMats(codigo, desc)
    }

    inputRef.current.focus()
  }


  const handleChangeCantidad = (e) => {
    setCantidad(e.target.value)
  }

  const handleChangeCodigo = (e) => {
    setCodigo(e.target.value)
  }

  const handleChangeDesc = (e) => {
    setDesc(e.target.value)
  }

  const handleChangePrecio = (e) => {
    setPrecio(e.target.value)
  }

  const handleCodeBlur = (e) => {
    const val = e.target.value
    const obtenido = localStorage.getItem(val)
    if (obtenido) {
      setDesc(obtenido)
      setStore(false)
      precioRefEntry.current.focus()
    } else {
      setStore(true)
    }
  }

  const handleChangeIva = (e) => { 
    setIva(e.target.value)
  } 
  

  return (
    <div className=" text-black w-full rounded-md flex flex-col items-center justify-center shadow bg-white">
      <form onSubmit={handleSubmitPersonal} autoComplete="off" className=" p-3 w-full flex justify-center gap-x-5">
        <label htmlFor="cantidad-input" className="flex flex-col w-14 items-start">
          <span className="text-xs ml-2">Cant.</span>
          <input ref={inputRef} onChange={handleChangeCantidad} value={cantidad} id="cantidad-input" placeholder="12" className=' text-center p-2 m-0.5 w-full rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 text-sm' type="number" />
        </label>
        <label htmlFor="cantidad-input" className="flex flex-col w-24 items-start">
          <span className="text-xs ml-2">Código</span>
          <input onBlur={handleCodeBlur} onChange={handleChangeCodigo} value={codigo} id="cantidad-input" placeholder='A0001234' className='w-full p-2 m-0.5 text-sm rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200' type="text" />
        </label>
        <label htmlFor="desc-input" className="flex flex-col w-96 items-start">
          <span className="text-xs ml-2">Descripción</span>
          <input onChange={handleChangeDesc} value={desc} id="desc-input" placeholder='Lima Cuadrada' className='w-96 p-2 m-0.5 text-sm rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200' type="text" />
        </label>
        <label htmlFor="precio-input-2" ref={precioRefEntry} className="flex flex-col w-24 items-start relative">
          <span className="text-xs ml-2">Precio unit.</span>
          <div className="relative w-full">
            <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-sm bg-slate">$</span>  
            <input onChange={handleChangePrecio}  value={precio} id="precio-input-2" placeholder='1200' className='p-2 pl-6 m-0.5 w-full text-sm rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200' type="number" step="0.01" />
          </div>  
        </label>
        <button title="Agregar Material" className="transition-all text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 border-black border-2 p-1 h-8 rounded w-8 flex justify-center items-center mb-1 self-end">
          <BiSolidSend />
          </button>
        <label htmlFor="iva-input-2" className="flex flex-col w-16 text-start justify-center items-start relative">
          <span className="text-xs ml-2">IVA</span>
          <select value={iva} onChange={handleChangeIva} name="" id="iva-input-2" className='p-2 m-0.5 w-full text-xs bg-white rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200'>
            <option value="21">21%</option>
            <option value="10.5">10.5%</option>
            </select>
        </label>
        {store
          ?
          <button type="button" title="El código será almacenado. Click para cambiar"
            onClick={() => { setStore(!store)}}
            className="text-blue-600 border-b-2 bg-white rounded border-blue-600 hover:border-2 hover:rounded transition p-1
            h-8  w-8 flex justify-center items-center mb-1 self-end">
            <BsDatabaseCheck />
          </button>
          :
          <button type="button" title="El código ya existe, no se almacenará su cambio. Click para cambiar"
            onClick={() => { setStore(!store)}}
            className="text-red-500 bg-white rounded border-b-2 border-red-500 hover:border-2 hover:rounded transition p-1
            h-8  w-8 flex justify-center items-center mb-1 self-end">
           <BsDatabaseDash />
        </button>
        }
      </form>
    </div>
  )
}
