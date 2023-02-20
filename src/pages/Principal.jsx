import React from 'react'
import Navbar from '../components/Navbar'
import CrearAlumno from '../components/crearAlumno'
import CrearEscuela from '../components/CrearEscuela'
import TablaAlumno from '../components/TablaAlumno'
const Principal = () => {
  return (
    <>
      <Navbar/>
      <CrearAlumno/>
      <CrearEscuela/>
      <TablaAlumno/>
    </>
  )
}

export default Principal