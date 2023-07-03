import React from 'react'
import { useContext, useState } from 'react';
import { DataContext } from '../Contexts/DataContext';
import moment from 'moment';

export default function Sheet({dataArray}) {
  const { datos, ubiIndex, infoHead} = useContext(DataContext);
  const { head } = datos;
  const fechaArgentina = moment(head.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY');

  return (
    <div className='text-black Sheet'>
          <header className='Encabezado'>
            <section className='Emisor'>
              <span className='Fecha'>{fechaArgentina}</span>
            </section>  
            <section className='Receptor'>
                <span className='Razon'>{infoHead.razon}</span> 
                <div className='TelDom'>
                  <span className='Domicilio'>{infoHead.ubicacion && ubiIndex && infoHead.ubicacion[ubiIndex].direccion}</span>
                  <span className='Telefono'>{infoHead.tel && infoHead.tel}</span>
                </div>
                <span className='Localidad'>{infoHead.ubicacion && ubiIndex && infoHead.ubicacion[ubiIndex].localidad}</span>
            </section>
              <section className='Info'>
                <div className='Info-1'>
                  <span>Responsable Inscripto</span>
                  <span className='CUIT'>{infoHead.cuit && infoHead.cuit}</span>
                </div>
                <div className='Info-2'>
                  <span className='numCliente'>{infoHead.numCliente ? infoHead.numCliente : '-'}</span>
                  <span className='OC'>{head.OC ? head.OC : '-'}</span>
                </div>
            </section>
          </header>
            <table className='Materiales'>
              {
                dataArray.map(cod => {
                  return (<div key={cod}>
                    <tr className='Item'>
                      {
                        (datos[cod].cantidad) ?
                          <>
                            <td className='Cantidad'>{datos[cod].cantidad}</td>
                            <td className='DescCode'>{datos[cod].codigo} {datos[cod].descripcion} </td>
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
