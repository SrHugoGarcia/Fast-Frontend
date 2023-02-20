//El useEffect puede ejcutar una sola vez una funcion
import { useState, createContext } from "react";

//Se utiliza en los hooks
const AuthContext = createContext();

//Children son todos los componentes para que este disponible
//El provider rodea toda la aplicacion en donde vienen los datos
//Toda la informacion que este dentro de return estara disponible en todos los componentes
const AuthProvider = ({ children }) => {
  const [alumno, setAlumno] = useState({});
  const [cargando, setCargando] = useState(true);


  return (
    <AuthContext.Provider
      value={{
       alumno,
       setAlumno,
       cargando,
       setCargando
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
