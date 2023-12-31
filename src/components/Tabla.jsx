import { DataContext } from '../Contexts/DataContext';
import { useContext } from 'react';
import Item from './ItemT';

export default function Tabla() {
    const { mats } = useContext(DataContext)

  return (
    <div className="relative overflow-x-auto rounded-md px-4 py-2 bg-white w-full h-5/6 shadow">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 border-b border-gray-300 uppercase bg-white  dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-4 py-2"> 
                        Pos
                    </th> 
                    <th scope="col" className="px-4 py-2"> 
                        Cantidad
                    </th>
                    <th scope="col" className="px-4 py-2"> 
                        Codigo
                    </th>    
                    <th scope="col" className="px-4 py-2">
                        Descripcion
                    </th>
                    <th scope="col" className="px-4 py-2">
                        Precio Un.
                    </th>
                    <th scope="col" className="px-4 py-2">
                        IVA
                    </th>
                    <th scope="col" className="px-4 py-2">
                        Subtotal
                    </th>
                    <th scope="col" className="px-3 py-2">
                        -
                    </th>
                </tr>
            </thead>
              <tbody>
                  {
                    mats.map((mat, index) => { 
                    return (
                        <Item key={mat.id} ident={mat.id} idx={index} />
                        )
                    })
                }
            
            </tbody>
        </table>
    </div>

  )
}
