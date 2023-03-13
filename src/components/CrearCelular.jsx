import React, { useEffect, useState } from 'react'
import servidorAxios from '../../config/servidorAxios';
import Alerta from "./Alerta";
const CrearCelular = () => {
    const [marca,setMarca] = useState();
    const [precio,setPrecio] = useState();
    const [fechaLanzamiento,setFechaLanzamiento] = useState();
    const [ram,setRam] = useState();
    const [almacenamiento,setAlmacenamiento] = useState();
    const [cantidadCamaras,setCantidadCamaras] = useState();

    const [alerta, setAlerta] = useState("")


   
const handleSubmit=async(e)=>{
e.preventDefault()
try{
    const respuesta = await servidorAxios({
        method: 'POST',
        url: `/celular`,
        data:{
            marca,
            precio,
            fechaLanzamiento,
            ram,
            almacenamiento,
            cantidadCamaras
            
        },
        withCredentials: true
       })
       if(respuesta.data.status === 'successful'){
        console.log("uuu")
        const msg = 'Creado Correctamente';
        setAlerta({
          msg,
          error: false
        })
    }
}catch(err){
    console.log(err)
    if(err.response.data.status == 'fail'){
      console.log("jkjkjk")
      setAlerta({
          msg: err.response.data.message,
          error: true
      }) 
  }
}   
}
const msg = alerta;
  return (
    <>
    <form onSubmit={e=>handleSubmit(e)} className="space-y-6" action="#" method="POST">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      {msg && <Alerta alerta={alerta}/>}

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Celular</h3>
            <p className="mt-1 text-sm text-gray-500">Aqui puedes dar de alta un celular</p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Marca" className="block text-sm font-medium text-gray-700">
                  Marca
                </label>
                <input
                  type="text"
                  name="Marca"
                  id="Marca"
                  onChange={e=>setMarca(e.target.value)}
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  name="precio"
                  onChange={e=>setPrecio(e.target.value)}
                  id="precio"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="fechaLanzamiento" className="block text-sm font-medium text-gray-700">
                  Fecha de Lanzamiento
                </label>
                <input
                  type="date"
                  onChange={e=>setFechaLanzamiento(e.target.value)}
                  name="fechaLanzamiento"
                  id="fechaLanzamiento"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Ram" className="block text-sm font-medium text-gray-700">
                  Ram
                </label>
                <input
                  type="number"
                  name="Ram"
                  onChange={e=>setRam(e.target.value)}
                  id="Ram"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Almacenamiento" className="block text-sm font-medium text-gray-700">
                  Almacenamiento
                </label>
                <input
                  type="number"
                  name="Almacenamiento"
                  onChange={e=>setAlmacenamiento(e.target.value)}
                  id="Almacenamiento"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="CantidadCamaras" className="block text-sm font-medium text-gray-700">
                  Cantidad de Camaras
                </label>
                <input
                  type="number"
                  name="CantidadCamaras"
                  onChange={e=>setCantidadCamaras(e.target.value)}
                  id="CantidadCamaras"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
      <button
        type="submit"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Crear Celular
      </button>
      </div>
    
    </form>
   
    </>
  )
}

export default CrearCelular