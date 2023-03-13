import { useEffect, useState } from "react"
import servidorAxios from "../../config/servidorAxios"

import Alerta from "./Alerta";


  export default function TablaCelular() {
    const[datos, setDatos] = useState()
    const [marca,setMarca] = useState();
    const [precio,setPrecio] = useState();
    const [fechaLanzamiento,setFechaLanzamiento] = useState();
    const [ram,setRam] = useState();
    const [almacenamiento,setAlmacenamiento] = useState();
    const [cantidadCamaras,setCantidadCamaras] = useState();
    const [reset,setReset] = useState()
    const [celulares,setCelulares] = useState()
    const [celular,setCelular]= useState()
    const [alerta,setAlerta] = useState()
    const [editar,setEditar] = useState(false)
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
  const obtenerCelulares=async()=>{
    try{
        const respuesta = await servidorAxios({
            method: 'GET',
            url: `/celular`,
            withCredentials: true
           })
           console.log(respuesta)
           if(respuesta.data.status === 'successful'){
           console.log(respuesta.data)
           setCelulares(respuesta.data.data.data)
           setReset(false)
        }
    }catch(err){
        console.log(err)
        if(err.response.data.status === 'fail'){
           
        }
}
}
obtenerCelulares()
    },[reset])
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const respuesta = await servidorAxios({
              method: 'PATCH',
              url: `/celular/${celular._id}`,
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
    const editarCelular =(e,celular)=>{
      e.preventDefault()
      console.log(celular)
      setMarca(celular.marca)
      setPrecio(celular.precio)
      setFechaLanzamiento(celular.fechaLanzamiento)
      setRam(celular.ram)
      setCantidadCamaras(celular.cantidadCamaras)
      setAlmacenamiento(celular.almacenamiento)
      setCelular(celular)
      setEditar(true)

    }
    const msg = alerta;
    const eliminarCelular=async(e,asignatura)=>{
      e.preventDefault()
      try{
          const respuesta = await servidorAxios({
              method: 'DELETE',
              url: `/celular/${celular._id}`,
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
      setMarca("")
      setPrecio("")
      setFechaLanzamiento("")
      setRam("")
      setCantidadCamaras("")
      setAlmacenamiento("")
      setEditar(true)
      setCelular("")  
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
            <h1 className="text-xl font-semibold text-gray-900">Lista de celulares</h1>
            <p className="mt-2 text-sm text-gray-700">
              Aqui puedes ver una lista de todas los celulares disponibles tambien puedes editarlos 
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
                        Marca
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Precio
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Fecha de lanzamiento
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Ram
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Almacenamiento
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Cantidad de Camaras
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
                    {celulares && celulares.map((celular,i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {celular.marca}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{celular.precio}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatearFecha(celular.fechaLanzamiento)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{celular.ram}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{celular.almacenamiento}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{celular.cantidadCamaras}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={e=>editarCelular(e,celular)}>Edit</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={e=>eliminarCelular(e,celular)}>Eliminar</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editar && celular?
      <>
          <form onSubmit={e=>handleSubmit(e)} className="space-y-6" action="#" method="POST">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      {msg && <Alerta alerta={alerta}/>}

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Asignatura</h3>
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
                  value={marca}
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
                  value={precio}
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
                  value={formatearFecha(fechaLanzamiento)}
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
                  autoComplete="family-name"
                  value={ram}
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
                  value={almacenamiento}
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
                  value={cantidadCamaras}
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
        Actualizar Celular
      </button>
      </div>
    
    </form>
      </>:
      <></>}
      </>
    )
  }
  