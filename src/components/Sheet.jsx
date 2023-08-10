import React from 'react'
import { useContext, useState } from 'react';
import { DataContext } from '../Contexts/DataContext';
import moment from 'moment';
import { HeadContext } from '../Contexts/HeadContext';

export default function Sheet() {
  const { mats } = useContext(DataContext);
  const { ubiIndex, infoHead, OC, fecha } = useContext(HeadContext)
  const fechaArgentina = moment(fecha, 'YYYY-MM-DD').format('DD/MM/YYYY');

  return (
    <div className='text-black Sheet'>
          <header className='Encabezado'>
            <section className='Emisor'>
              <span className='Fecha'>{fechaArgentina}</span>
            </section>  
            <section className='Receptor'>
                <span className='Razon'>{infoHead.razon}</span> 
                <div className='TelDom'>
                  <span className='Domicilio'>{infoHead.ubicacion && infoHead.ubicacion[ubiIndex].direccion}</span>
                  <span className='Telefono'>{infoHead.tel && infoHead.tel}</span>
                </div>
                <span className='Localidad'>{infoHead.ubicacion && infoHead.ubicacion[ubiIndex].localidad}</span>
            </section>
              <section className='Info'>
                <div className='Info-1'>
                  <span>Responsable Inscripto</span>
                  <span className='CUIT'>{infoHead.cuit && infoHead.cuit}</span>
                </div>
                <div className='Info-2'>
                  <span className='numCliente'>{infoHead.numCliente ? infoHead.numCliente : '-'}</span>
                  <span className='OC'>{OC ? OC : '-'}</span>
                </div>
            </section>
          </header>
            <table className='Materiales'>
              {
                mats.map(elem => {
                  return (<div key={elem.id}>
                    <tr className='Item'>
                      {
                        (elem.cantidad) ?
                          <>
                            <td className='Cantidad'>{elem.cantidad}</td>
                            <td className='DescCode'>{elem.codigo} {elem.desc} </td>
                          </>
                          : <div className='vacio'> </div>
                      }
                    </tr>
                  </div>)
                })
              }
          </table>
          </div>
  )
}
