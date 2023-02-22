import { useEffect, useState,Fragment } from "react"
import servidorAxios from "../../config/servidorAxios"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
import Alerta from "./Alerta";


  export default function TablaAsignatura() {
    const[datos, setDatos] = useState()
    const[editar, setEditar] = useState(false)
    const [alerta,setAlerta] = useState()
    const [nombre,setNombre] = useState();
    const [creditos,setCreditos] = useState();
    const [horas,setHoras] = useState();
    const [reset,setReset] = useState()
    const [asignatura, setAsignatura] = useState()
    const [profesor, setProfesor] = useState("")
    const [profesores, setProfesores] = useState()

    useEffect(()=>{
      const obtenerAsignaturas=async()=>{
          try{
              const respuesta = await servidorAxios({
                  method: 'GET',
                  url: `/asignatura`,
                  withCredentials: true
                 })
                 console.log(respuesta.data.data.data)
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
  obtenerAsignaturas()
  const obtenerProfesores=async()=>{
    try{
        const respuesta = await servidorAxios({
            method: 'GET',
            url: `/profesor`,
            withCredentials: true
           })
           console.log(respuesta)
           if(respuesta.data.status === 'successful'){
           console.log(respuesta.data)
           setProfesores(respuesta.data.data.data)
           setReset(false)
        }
    }catch(err){
        console.log(err)
        if(err.response.data.status === 'fail'){
           
        }
}
}
obtenerProfesores()
    },[reset])
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const respuesta = await servidorAxios({
              method: 'PATCH',
              url: `/asignatura/${asignatura._id}`,
              data:{
                  nombre,
                  creditos,
                  horas,
                  profesor: profesor._id
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
          console.log(err)
          if(err.response.data.status == 'error'){
            console.log("jkjkjk")
            setAlerta({
                msg: err.response.data.message,
                error: true
            }) 
        }
      }   
      }
    const editarUser =(e,asignatura)=>{
      e.preventDefault()
      console.log(asignatura)
      setNombre(asignatura.nombre)
      setCreditos(asignatura.creditos)
      setHoras(asignatura.horas)
      setEditar(true)
      setAsignatura(asignatura)

    }
    const msg = alerta;
    const eliminarUser=async(e,asignatura)=>{
      e.preventDefault()
      try{
          const respuesta = await servidorAxios({
              method: 'DELETE',
              url: `/asignatura/${asignatura._id}`,
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
      setCreditos("")
      setHoras("")
      setEditar(true)
      setAsignatura("")  
      }
     console.log(profesores)
    return (
      <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Lista de Asignaturas</h1>
            <p className="mt-2 text-sm text-gray-700">
              Aqui puedes ver una lista de todas las Asignaturas 
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
                        Horas
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Creditos
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Profesor
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
                    {datos && datos.map((asignatura,i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {asignatura.nombre}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asignatura.horas}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asignatura.creditos}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asignatura && asignatura.profesor? asignatura.profesor.nombre + " " + asignatura.profesor.apellidoPaterno + " " +asignatura.profesor.apellidoMaterno  : ""}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={e=>editarUser(e,asignatura)}>Edit</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={e=>eliminarUser(e,asignatura)}>Eliminar</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editar && asignatura?
      <>
         <form onSubmit={e=>handleSubmit(e)} className="space-y-6" >

          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">

            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">asignatura</h3>
                <p className="mt-1 text-sm text-gray-500">Aqui puedes dar actualizar o eliminar un asignatura</p>
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
                    <label htmlFor="Horas" className="block text-sm font-medium text-gray-700">
                      Horas
                    </label>
                    <input
                      type="Number"
                      name="Horas"
                      value={horas}
                      onChange={e=>setHoras(e.target.value)}
                      id="Horas"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="Creditos" className="block text-sm font-medium text-gray-700">
                      Creditos
                    </label>
                    <input
                      type="Number"
                      value={creditos}
                      onChange={e=>setCreditos(e.target.value)}
                      name="Creditos"
                      id="Creditos"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">

                  <Listbox value={profesor} onChange={setProfesor}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Profesores</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{profesor ? profesor.nombre : "Selecciona una Opcion"}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {profesores && profesores.map((person) => (
                  <Listbox.Option
                    key={person._id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.nombre + " " + person.apellidoPaterno + " " + person.apellidoMaterno}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
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
            Actualizar asignatura
          </button>
          </div>

          </form>
      </>:
      <></>}
      </>
    )
  }
  