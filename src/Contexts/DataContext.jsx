import { createContext, useState, useEffect } from "react";
import { addMaterials } from "../components/services/addMaterials";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { ObtenerConstantes } from '../mocks/Constantes.js'
import { formatear } from "../components/services/formater";
import { obtenerObjetoProveedores } from "../components/services/registrarProveedor";
import { useNavigate } from 'react-router-dom';



export const DataContext = createContext();


export const DataContextProvider = ({ children }) => {
  
  const [infoHead, setInfoHead] = useState({});
  const [ubiIndex, setUbiIndex] = useState('0');
  const [mats, setMats] = useState([])
  const [total, setTotal] = useState('')
  const [print, setPrint] = useState(false)

  const calcularTotal = () => {
    let res = 0;
    mats.forEach(mat => { res += Number(mat.precio) * Number(mat.cantidad) })
    setTotal(String(res))
  }

  const handleConfirm = () => { 
    setPrint(!print)
  }

  useEffect(calcularTotal, [mats])
  
  const updateMats = (codigo, desc) => {
    const indices = getAllIndexes(mats, codigo)
    if (indices.length > 0) {
      setMats(prevState => {
        const newMats = [...prevState]
        indices.forEach(idx => { newMats[idx].desc = desc })
        return newMats
      })
    }
  }

  const getAllIndexes = (arr, val) => {
    const indices = [];
    for (let i = 0; i < mats.length; i++) {
      if (arr[i].codigo === val) {
        indices.push(i);
      }
    }
    return indices;
  }

  const eliminarMaterial = ident => {
    const newMats = mats.filter(mat => mat.id !== ident)
    setMats(newMats)
  }

  const cambiarValor = (valor, id, nombre) => {
    setMats(prevState => {
      const idx = prevState.findIndex(elem => elem.id == id)
      const field = nombre.split('-')[0]
      prevState[idx][field] = valor
      if (field === 'precio' || 'cantidad' || 'iva') {
        calcularTotal()
      }
      return prevState
    })
  }

  
  console.log(mats);

  const agregarMaterial = (cantidad, codigo, desc, precio, iva) => {
    const newMat = {
      id: crypto.randomUUID(),
      cantidad,
      codigo,
      desc,
      precio,
      iva
    }
    setMats(prevMats => [...prevMats, newMat])
  }

  const limpiarMateriales = () => { 
    setMats([])
  }

  const clonarMaterial = (ident) => { 
    const idx = mats.findIndex(elem => elem.id == ident)
    const { codigo, cantidad, desc, precio } = mats[idx]
    agregarMaterial(cantidad, codigo, desc, precio)
  }
  
  console.log(JSON.stringify(mats));

  const swapUp = (ident) => { 
    setMats(prevState => { 
      const idx = mats.findIndex(elem => elem.id == ident)
      if (idx > 0) {
        const newMats = [...prevState]
        const saved = newMats[idx - 1]
        newMats[idx-1] = newMats[idx]
        newMats[idx] = saved
        return newMats
      }
      return prevState
    })
  }

  const swapDown = (ident) => { 
    setMats(prevState => {
      const idx = mats.findIndex(elem => elem.id == ident)
      if (idx < mats.length - 1) {
        const newMats = [...prevState]
        const saved = newMats[idx + 1]
        newMats[idx+1] = newMats[idx]
        newMats[idx] = saved
        return newMats
      }
      return prevState
    })
  }


  const { register, handleSubmit, unregister, setValue, getValues, watch, reset } = useForm();
  
  
  const handleSelect = (e) => {
    setUbiIndex('0')
    setValue('head.ubiIndex', '0')
    setValue('head.empresa', e.target.value)
  }


  const handleUbi = (e) => {
    setUbiIndex(e.target.value);
    setValue('head.ubiIndex', e.target.value)
  }

  const selected = watch('head.empresa')

  const procesarDatos = (e) => {
    console.log('works');
  }

  return (
    
    <DataContext.Provider value={{ register, handleSubmit, unregister, setValue, getValues, watch, infoHead, handleSelect, handleUbi, ubiIndex, selected, mats, agregarMaterial, eliminarMaterial, cambiarValor, total, swapUp, swapDown, updateMats, clonarMaterial, limpiarMateriales, procesarDatos, handleConfirm, print}}>
      { children }
    </DataContext.Provider>
  )
}