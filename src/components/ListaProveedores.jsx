
import { useContext } from 'react';
import { HeadContext } from '../Contexts/HeadContext';
import { useProveedores } from '../Hooks/useProveedores';

export default function ListaProveedores() {

  const { proveedores } = useProveedores();

  const { handleClienteChange, cliente } = useContext(HeadContext)

  return (

    <select autoFocus defaultValue={'default'} value={cliente} className={(cliente ? 'default' : ' border-2 border-b-red-500 outline-2 outline-red-500') + ' p-1 m-1 h-8 bg-white text-center px-3 w-64 rounded-sm text-base'} name="" id="" onChange={handleClienteChange}>
      <option disabled value="default">Seleccione uno</option>
      {proveedores.map(proveedor => {
        return <option className='p-1 m-1' value={proveedor.razon} key={proveedor.razon}>{proveedor.razon}</option>
      })}
    </select>
  )
}
