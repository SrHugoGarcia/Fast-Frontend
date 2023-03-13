import { useEffect, useState } from "react"
import servidorAxios from "../../config/servidorAxios"

import Alerta from "./Alerta";


  export default function TablaProfesor() {
    const[datos, setDatos] = useState([])
    const[editar, setEditar] = useState(false)
    const [alumno, setAlumno]= useState({})
    const [alerta, setAlerta] = useState()
    const [nombre,setNombre] = useState();
    const [apellidoPaterno,setApellidoPaterno] = useState();
    const [apellidoMaterno,setApellidoMaterno] = useState();
    const [fechaNacimiento,setFechaNacimiento] = useState();
    const [sexo,setSexo] = useState();
    const [celular,setCelular] = useState();
    const [rfc, setRfc] = useState()
    const [profesion, setprofesion] = useState()
    const [numeroEmpleado, setNumeroEmpleado] = useState()
    const [direccion,setDireccion] = useState();
    const [reset,setReset] = useState()
    useEffect(()=>{
      const obtenerAlumnos=async()=>{
          try{
              const respuesta = await servidorAxios({
                  method: 'GET',
                  url: `/profesor`,
                  withCredentials: true
                 })
                 console.log(respuesta)
                 if(respuesta.data.status === 'successful'){
                 console.log(respuesta.data)
                 setDatos(respuesta.data.data.data)
                 setReset(false)
              }
          }catch(err){
              console.log(err)
              if(err.response.data.status === 'fail'){
                 
              }
      }
  }
  obtenerAlumnos()
    },[reset])
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const respuesta = await servidorAxios({
              method: 'PATCH',
              url: `/profesor/${alumno._id}`,
              data:{
                  nombre,
                  apellidoPaterno,
                  apellidoMaterno,
                  fechaNacimiento,
                  sexo,
                  celular,
                  direccion
              },
              withCredentials: true
             })
             console.log(respuesta.data.status)
             if(respuesta.data.status === 'successful'){
              const msg = 'Actualizado Correctamente';
              setAlerta({
                msg,
                error: false
              })
              setReset(true)
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
    const editarUser =(e,alumno)=>{
      e.preventDefault()
      setNombre(alumno.nombre)
      setApellidoPaterno(alumno.apellidoPaterno)
      setApellidoMaterno(alumno.apellidoMaterno)
      setFechaNacimiento(alumno.fechaNacimiento)
      setSexo(alumno.sexo)
      setCelular(alumno.celular)
      setDireccion(alumno.direccion)
      setFechaNacimiento(formatearFecha(alumno.fechaNacimiento))
      setprofesion(alumno.profesion)
      setRfc(alumno.rfc)
      setNumeroEmpleado(alumno.numeroEmpleado)
      setEditar(true)
      setAlumno(alumno)

    }
    const msg = alerta;
    const eliminarUser=async(e,person)=>{
      e.preventDefault()
      try{
          const respuesta = await servidorAxios({
              method: 'DELETE',
              url: `/profesor/${person._id}`,
              withCredentials: true
             })
             console.log(respuesta.status)
             if(respuesta.status == 204){
              const msg = 'Eliminado Correctamente';
              setAlerta({
                msg,
                error: false
              })
              setReset(true)
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
      setNombre("")
      setApellidoPaterno("")
      setApellidoMaterno("")
      setFechaNacimiento("")
      setSexo("")
      setCelular("")
      setDireccion("")
      setFechaNacimiento(formatearFecha(""))
      setprofesion("")
      setRfc("")
      setNumeroEmpleado("")
      setEditar(true)
      setAlumno("")  
      }
      const formatearFecha = (fecha) => {
        console.log(fecha)
        const extraerDate = fecha.split("-")
        const fechaSplit = extraerDate[2].split("T")
        return extraerDate[0] +"-"+ extraerDate[1]+"-"+fechaSplit[0]
    }
    return (
      <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Lista de Profesores</h1>
            <p className="mt-2 text-sm text-gray-700">
              Aqui puedes ver una lista de todos los Profesores
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {msg && <Alerta alerta={alerta}/>}

          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Nombre
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Apellido Paterno
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Apellido Materno
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Fecha de Nacimiento
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Profesion
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        RFC
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Numero de Empleado
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Editar
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {datos && datos.map((person,i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.nombre}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.nombre}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.apellidoPaterno}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.apellidoMaterno}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.profesion}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.rfc}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.numeroEmpleado}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={e=>editarUser(e,person)}>Edit</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={e=>eliminarUser(e,person)}>Eliminar</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editar && alumno?
      <>
         <form onSubmit={e=>handleSubmit(e)} className="space-y-6" >

          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">

            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Alumno</h3>
                <p className="mt-1 text-sm text-gray-500">Aqui puedes dar actualizar o eliminar un alumno</p>
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
                      value={nombre}
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
                      value={apellidoPaterno}
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
                      value={apellidoMaterno}
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
                      value={fechaNacimiento}
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
                      value={sexo}
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
                      value={celular}
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
                      value={direccion}
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
            Actualizar Alumno
          </button>
          </div>

          </form>
      </>:
      <></>}
      </>
    )
  }
  