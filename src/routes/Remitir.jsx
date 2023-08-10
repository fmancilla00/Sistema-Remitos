import React from 'react'
import Form from '../components/Form'
import { HeadContextProvider } from '../Contexts/HeadContext'
import { useContext } from 'react'
import { DataContext } from '../Contexts/DataContext'
import Printable from '../components/Printable'

  
export default function Remitir() {
  const { print } = useContext(DataContext)
  return (
        <HeadContextProvider>
          {!print ? <Form /> : <Printable />}
        </HeadContextProvider>
  )
}
