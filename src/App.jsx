import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Remitir from './routes/Remitir'
import Proveedores from './routes/Proveedores';
import MainMenu from './routes/MainMenu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu/>
  },
  {
    path: '/proveedores',
    element: <Proveedores/>
  },
  {
    path: '/remitir',
    element: <Remitir/>
  }
]);

function App() {
  return (
    <div className="container my-10 mx-auto bg-slate-200">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
