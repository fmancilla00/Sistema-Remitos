
import { useContext } from 'react';
import { HeadContext } from '../Contexts/HeadContext';
import { useProveedores } from '../Hooks/useProveedores';

export default function ListaProveedores() {

  const { proveedores } = useProveedores();

  const { handleClienteChange, cliente } = useContext(HeadContext)

  return (

    <select autoFocus defaultValue={'default'} value={cliente} className={'m-1  bg-white p-2 w-64 text-base rounded-md border transition-all duration-300 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200'} name="" id="" onChange={handleClienteChange}>
      <option disabled value="default">Seleccione uno</option>
      {proveedores.map(proveedor => {
        return <option className='p-1 m-1' value={proveedor.razon} key={proveedor.razon}>{proveedor.razon}</option>
      })}
    </select>
  )
}
