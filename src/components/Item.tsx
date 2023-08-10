import { useEffect, useState, useContext, useRef } from "react"
import { ChangeEvent } from "react"
import { matType } from "./tipos"
import { DataContext } from '../Contexts/DataContext';
import { RxCrossCircled } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbReplace } from "react-icons/tb";
import { FaRegClone } from "react-icons/fa6";





interface ItemType { 
  ident: string
  mats: matType[]
  idx: number
}

export default function Item({ ident, idx }: ItemType) {
  const [cantidad, setCantidad] = useState('')
  const [codigo, setCodigo] = useState('')
  const [desc, setDesc] = useState('')
  const [precio, setPrecio] = useState('')
  const [iva, setIva] = useState('')
  const precioRef = useRef(null)
  const { mats, eliminarMaterial, cambiarValor, swapUp, swapDown, updateMats, clonarMaterial } = useContext(DataContext)
  

  useEffect(() => {
    const material = mats.filter(mat => { return mat.id === ident })[0]
    setCantidad(material.cantidad)
    setCodigo(material.codigo)
    setDesc(material.desc)
    setPrecio(material.precio)
    setIva(material.iva)
  }, [])

  useEffect(() => { 
    const idx = mats.findIndex(elem => elem.id == ident)
    setDesc(mats[idx].desc)
  }
    , [mats])

  const handleChangeCantidad = (e: ChangeEvent<HTMLInputElement>) => {
    setCantidad(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const handleChangeCodigo = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigo(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const handleChangeDesc = (e: ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const handleChangePrecio = (e: ChangeEvent<HTMLInputElement>) => {
    setPrecio(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const handleChangeIva = (e: ChangeEvent<HTMLInputElement>) => {
    setIva(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const actualizarCodigo = () => {
    if (codigo) {
      localStorage.setItem(codigo, desc)
      updateMats(codigo, desc)
      console.log('hola')
    }
  }

  const handleCodeBlur = () => { 
    const obtenido = localStorage.getItem(codigo)
    if (obtenido) {
      setDesc(obtenido)
      precioRef.current.focus()
    }
  }

  return (
    <div className="flex w-full justify-center items-center text-black text-xs gap-0.5">
      <span className="m-1 w-5">{String(idx + 1)}</span>
      <input onChange={handleChangeCantidad} autoComplete="off" value={cantidad} id="cantidad-input" className=' text-center p-1 m-0.5 w-14 rounded-sm' type="number" />
      <input onBlur={handleCodeBlur} onChange={handleChangeCodigo} autoComplete="off" value={codigo} id="codigo-input" className='w-24 p-1 m-0.5 rounded-sm' type="text" />
      <input onChange={handleChangeDesc} autoComplete="off" value={desc} id="desc-input" className='w-96 p-1 m-0.5 rounded-sm' type="text" />
      <input ref={precioRef} onChange={handleChangePrecio} autoComplete="off" value={precio} id="precio-input" className='p-1 pl-6 m-0.5 w-28 rounded-sm' type="number" step="0.01" />
      <select onChange={handleChangeIva} id='iva-input' value={iva} className='p-0.5 m-0.5 h-6 bg-white text-xs rounded-sm'>
        <option value="21">21%</option>
        <option value="10.5">10.5%</option>
      </select>
      <span className="p-1 m-0.5 w-24 rounded-sm bg-gray-100 text-center overflow-hidden">
        $ {Number(precio) * Number(cantidad)}
      </span>
      <div className="flex flex-col justify-center bg-white px-0.5 mx-1 w-4 h-6 rounded-sm">
        <button title="Subir item" type="button" onClick={() => swapUp(ident)} className=" rounded">
          {idx > 0 && <IoIosArrowUp />}
        </button>
        <button title="Bajar item" type="button" onClick={() => swapDown(ident)} className=" rounded"> 
          {idx < mats.length - 1 && <IoIosArrowDown />}
        </button>
      </div>
      <button title="Actualizar código en la base de datos" onClick={actualizarCodigo} className=' transition hover:text-blue-600 flex items-center justify-start mx-1'>
        <TbReplace className='w-4 h-6  font-bold rounded-sm bg-white border-2 border-white text-lg' />
      </button>
      <button title="Clonar item" onClick={() => { clonarMaterial(ident)}} className=' transition hover:text-emerald-600 flex items-center justify-start mx-1'>
        <FaRegClone className='w-4 p-0.5 h-6  font-bold rounded-sm bg-white border-2 border-white text-lg' />
      </button>
      <button title='Eliminar item' onClick={() => eliminarMaterial(ident)} tabIndex={-1} type="button"
        className=' transition hover:text-red-500 flex items-center justify-start mx-1' >
        <RxCrossCircled className='w-4 h-4  font-bold rounded-full bg-white border-2 border-white text-lg' />
      </button>
    </div>
  )
}
