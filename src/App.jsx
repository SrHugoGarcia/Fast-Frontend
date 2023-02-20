import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TablaAlumno from './components/TablaAlumno'
import TablaProfesor from './components/TablaProfesor'
import { AuthProvider } from './context/AuthProvider'
import Layout from './layouts/Layout'
import Alumno from './pages/Alumno'
import Asignatura from './pages/Asignatura'
import Principal from './pages/Principal'
import Profesor from './pages/Profesor'

function App() {

  return (
    <BrowserRouter>
          <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Principal/>}/>
            <Route path='/alumno' element={<Alumno/>}/>
            <Route path='/alumno-lista' element={<TablaAlumno/>}/>
            <Route path='/asignatura' element={<Asignatura/>}/>
            <Route path='/profesor' element={<Profesor/>}/>
            <Route path='/profesor-lista' element={<TablaProfesor/>}/>

        </Route>
      </Routes>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
