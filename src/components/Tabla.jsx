import { DataContext } from '../Contexts/DataContext';
import { useContext } from 'react';
import Item from './ItemT';
import React from 'react';

// eslint-disable-next-line react/display-name, no-empty-pattern
const Tabla = React.forwardRef((_, ref) => {
    const { mats } = useContext(DataContext)

  return (
    <div ref={ref} className="relative overflow-x-auto overflow-y-scroll rounded-md px-4 py-2 bg-white w-full shadow h-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400 overflow-y-scroll">
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
})

export default Tabla