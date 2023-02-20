import React, { useEffect, useState } from 'react'
import servidorAxios from '../../config/servidorAxios';
const CrearEscuela = () => {
    const [nombre,setNombre] = useState();
    const [creditos,setCreditos] = useState();
    const [horas,setHoras] = useState();


   
const handleSubmit=async(e)=>{
e.preventDefault()
try{
    const respuesta = await servidorAxios({
        method: 'POST',
        url: `/asignatura`,
        data:{
            nombre,
            creditos,
            horas
            
        },
        withCredentials: true
       })
       if(respuesta.data.status === 'successful'){
       console.log("agregado correctamente")
    }
}catch(err){
    console.log(err)
    if(err.response.data.status === 'fail'){
       
    }
}   
}

  return (
    <>
    <form onSubmit={e=>handleSubmit(e)} className="space-y-6" action="#" method="POST">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Alumno</h3>
            <p className="mt-1 text-sm text-gray-500">Aqui puedes dar de alta un alumno</p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  onChange={e=>setNombre(e.target.value)}
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700">
                  Creditos
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  onChange={e=>setCreditos(e.target.value)}
                  id="apellidoPaterno"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700">
                  Horas
                </label>
                <input
                  type="number"
                  onChange={e=>setHoras(e.target.value)}
                  name="apellidoMaterno"
                  id="apellidoMaterno"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type='submit'>
            Guardar
      </button>
    </form></>
  )
}

export default CrearEscuela