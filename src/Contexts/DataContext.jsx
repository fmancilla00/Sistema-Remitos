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
  const [datos, setDatos] = useState(null);
  const [total, setTotal] = useState(0);
  const [ids, setIds] = useState([])
  
  
  const [infoHead, setInfoHead] = useState({});
  const [ubiIndex, setUbiIndex] = useState('0');

  const [usaCodigo, setUsaCodigo] = useState(true);
  
  
  
  const { register, handleSubmit, unregister, setValue, getValues, watch, reset } = useForm();
  
  
  const addId = () => {
    const newMat = uuidv4()
    setIds([...ids, newMat])
  }
  
  const deleteMaterial = (ident) => {
    const { PRECIO, CODIGO, DESC, CANT } = ObtenerConstantes(ident)
    
    const newMats = ids.filter((mat) => mat !== ident)
    setTotal(total - Number((getValues(`${ident}.precio`)) * Number(getValues(`${ident}.cantidad`))));
    unregister(CODIGO)
    unregister(DESC)
    unregister(CANT)
    unregister(PRECIO)
    setIds(newMats);
  }
  
  const navigate = useNavigate();

  const procesarDatos = data => {
    setDatos(data);
    navigate('/imprimir', {
      state: {
        datos: data,
        infoHead,
        ubiIndex
      }
    })
  }
  
  const handleSelect = (e) => {
    setUbiIndex('0')
    setValue('head.ubiIndex', '0')
    setValue('head.empresa', e.target.value)
  }


  const handleUbi = (e) => {
    setUbiIndex(e.target.value);
    setValue('head.ubiIndex', e.target.value)
  }


  const formatearRemito = (e) => {
    let newVal = formatear(getValues('head.remito'));
    setValue('head.remito', newVal);
  }

  const selected = watch('head.empresa')

  const setearProveedor = () => {
    useEffect(() => {
      const provs = obtenerObjetoProveedores(selected);
      if (provs != null) {
        setInfoHead(provs);
      }

    }, [selected])
  }

  const reiniciarRemito = () => {
    setInfoHead({});
    reset();
    if (datos !== null) {
      setIds([]);
    } else {
      const codes = ids.slice(1);
      codes.forEach(code => { deleteMaterial(code) })
      setIds(addMaterials(9))
    }
    setTotal(0);
    setDatos(null);
    setUbiIndex(0);
    setUsaCodigo(true);
  }

  const addInitialIds = () => {
    if (datos === null) {
      useEffect(() => {
        reiniciarRemito();
      },
        [])
    }
  }

  const toggleCodigos = () => { 
    setUsaCodigo(!usaCodigo)
  }

  return (
    
    <DataContext.Provider value={{ datos, total, setTotal, ids, addInitialIds, addId, register, handleSubmit, unregister, setValue, getValues, watch, deleteMaterial, procesarDatos, infoHead, handleSelect, handleUbi, formatearRemito, ubiIndex, setearProveedor, selected, reiniciarRemito, usaCodigo, toggleCodigos}}>
      { children }
    </DataContext.Provider>
  )
}