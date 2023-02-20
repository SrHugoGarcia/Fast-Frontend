import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Principal from './pages/Principal'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Principal/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
