import { DataContext } from '../Contexts/DataContext';
import { useContext } from 'react';
import React from 'react';
import Item from './Item';

// eslint-disable-next-line react/display-name
const ListaMateriales = React.forwardRef(({ident }, ref) => {

  const { mats } = useContext(DataContext)

  return (
    <div ref={ref} className='flex flex-col py-1 pb-2 bg-slate-100 rounded-b w-full gap-1 h-[69vh] items-center overflow-y-scroll'>
      {
        mats.map((mat, index) => { 
          return (
            <Item key={mat.id} ident={mat.id} idx={index} />
            )
          })
      }
    </div>
  )
})

export default ListaMateriales
