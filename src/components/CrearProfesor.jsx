import React, { useEffect, useState } from 'react'
import servidorAxios from '../../config/servidorAxios';
import Alerta from "./Alerta";
import TablaAlumno from './TablaAlumno';

const CrearProfesor = () => {
    const [nombre,setNombre] = useState();
    const [apellidoPaterno,setApellidoPaterno] = useState();
    const [apellidoMaterno,setApellidoMaterno] = useState();
    const [fechaNacimiento,setFechaNacimiento] = useState();
    const [sexo,setSexo] = useState();
    const [celular,setCelular] = useState();
    const [direccion,setDireccion] = useState();
    const [rfc, setRfc] = useState()
    const [profesion, setProfesion] = useState()
    const [numeroEmpleado, setNumeroEmpleado] = useState()

    const [alerta, setAlerta] = useState("")
const handleSubmit=async(e)=>{
e.preventDefault()
try{
    console.log(profesion)
    const respuesta = await servidorAxios({
        method: 'POST',
        url: `/profesor`,
        data:{
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            fechaNacimiento,
            sexo,
            celular,
            direccion,
            profesion,
            rfc,
            numeroEmpleado
        },
        withCredentials: true
       })
       console.log(respuesta.data.status)
       if(respuesta.data.status === 'successful'){
        const msg = 'Creado Correctamente';
        setAlerta({
          msg,
          error: false
        })
    }
}catch(err){
    console.log(err.response.data.status)
    if(err.response.data.status == 'error'){
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

    <form onSubmit={e=>handleSubmit(e)} className="space-y-6" >

      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      {msg && <Alerta alerta={alerta}/>}

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profeosr</h3>
            <p className="mt-1 text-sm text-gray-500">Aqui puedes dar de alta un profesor</p>
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
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  onChange={e=>setApellidoPaterno(e.target.value)}
                  id="apellidoPaterno"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  onChange={e=>setApellidoMaterno(e.target.value)}
                  name="apellidoMaterno"
                  id="apellidoMaterno"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  onChange={e=>setFechaNacimiento(e.target.value)}
                  name="FechaNacimiento"
                  id="FechaNacimiento"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Genero" className="block text-sm font-medium text-gray-700">
                  Genero
                </label>
                <input
                  type="text"
                  onChange={e=>setSexo(e.target.value)}
                  name="Genero"
                  id="Genero"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
                  Celular
                </label>
                <input
                  type="text"
                  onChange={e=>setCelular(e.target.value)}
                  name="celular"
                  id="celular"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Direccion" className="block text-sm font-medium text-gray-700">
                 Direccion
                </label>
                <input
                  type="text"
                  onChange={e=>setDireccion(e.target.value)}
                  name="Direccion"
                  id="Direccion"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="profesion" className="block text-sm font-medium text-gray-700">
                 Profesion
                </label>
                <input
                  type="text"
                  onChange={e=>setProfesion(e.target.value)}
                  name="profesion"
                  id="profesion"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="rfc" className="block text-sm font-medium text-gray-700">
                 RFC
                </label>
                <input
                  type="text"
                  onChange={e=>setRfc(e.target.value)}
                  name="rfc"
                  id="rfc"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="empleado" className="block text-sm font-medium text-gray-700">
                 Numero de empleado
                </label>
                <input
                  type="Number"
                  onChange={e=>setNumeroEmpleado(e.target.value)}
                  name="empleado"
                  id="empleado"
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
        Crear Profesor
      </button>
      </div>
    
    </form>
    </>
  )
}

export default CrearProfesor