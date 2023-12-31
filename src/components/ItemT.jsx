import { useEffect, useState, useContext, useRef } from "react"
import { DataContext } from '../Contexts/DataContext';
import { RxCrossCircled } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbReplace } from "react-icons/tb";
import { FaRegClone } from "react-icons/fa6";





export default function Item({ ident, idx }) {
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

  const handleChangeCantidad = (e) => {
    setCantidad(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const handleChangeCodigo = (e) => {
    setCodigo(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const handleChangeDesc = (e) => {
    setDesc(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const handleChangePrecio = (e) => {
    setPrecio(e.target.value)
    cambiarValor(e.target.value, ident, e.target.id)
  }

  const handleChangeIva = (e) => {
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
    <tr className="dark:bg-gray-800 bg-white">
        <td className="px-4 py-2">
          {String(idx + 1)}
        </td>
        <td className="px-4 py-2">
          <input onChange={handleChangeCantidad} autoComplete="off" value={cantidad} id="cantidad-input" className=' p-1 px-2 rounded-md w-20 border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200' type="number" />
        </td>
      <td className="px-4 py-2">
        <input onBlur={handleCodeBlur} onChange={handleChangeCodigo} autoComplete="off" value={codigo} id="codigo-input" className='p-1 px-2 rounded-md w-20 border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200' type="text" />
      </td>
      <th scope="row" className="px-4 py-2 font-medium whitespace-nowrap dark:text-white ">
          <input onChange={handleChangeDesc} autoComplete="off" value={desc} id="desc-input" className='p-1 px-2 rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200' type="text" />
      </th>
      <td className="px-4 py-2">
        <div className="relative">
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-sm bg-slate">$</span> 
          <input ref={precioRef} onChange={handleChangePrecio} autoComplete="off" value={precio} id="precio-input" className='p-1 px-6 rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 w-28' type="number" step="0.01" />
        </div>
      </td>
      <td className="px-4 py-2">
        <select onChange={handleChangeIva} id='iva-input' value={iva} className=' bg-white p-1 px-2 rounded-md border transition-all duration-200 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 w-18 w-16'>
          <option value="21">21%</option>
          <option value="10.5">10.5%</option>
        </select>
      </td>
      <td className="px-4 py-2">
        $ {Number(precio) * Number(cantidad)}
      </td>
      <td className="px-1 py-2 flex items-center justify-center">
        <div className="flex flex-col justify-center w-4 h-6 rounded-sm">
        <button title="Subir item" type="button" onClick={() => swapUp(ident)} className=" rounded">
          {idx > 0 && <IoIosArrowUp />}
        </button>
        <button title="Bajar item" type="button" onClick={() => swapDown(ident)} className=" rounded"> 
          {idx < mats.length - 1 && <IoIosArrowDown />}
        </button>
        </div>
        <button title="Actualizar código en la base de datos" onClick={actualizarCodigo} className=' transition hover:text-blue-600 flex items-center justify-start mx-1'>
        <TbReplace className='w-4.5 h-4.5  font-bold rounded-sm bg-white border-2 border-white text-lg' />
        </button>
        <button title="Clonar item" onClick={() => { clonarMaterial(ident)}} className=' transition hover:text-emerald-600 flex items-center justify-start mx-1'>
          <FaRegClone className='w-4.5 p-0.5 h-4.5  font-bold rounded-sm bg-white border-2 border-white text-lg' />
        </button>
        <button title='Eliminar item' onClick={() => eliminarMaterial(ident)} tabIndex={-1} type="button"
          className=' transition hover:text-red-500 flex items-center justify-start mx-1' >
          <RxCrossCircled className='w-4.5 h-4.5  font-bold rounded-full bg-white border-2 border-white text-lg' />
        </button>
      </td>
      </tr>
    )
}
