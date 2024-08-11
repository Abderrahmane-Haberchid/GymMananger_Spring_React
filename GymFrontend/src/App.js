
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Sidebar from './components/Sidebar'
import Statis from './pages/Statis';
import Membres from './pages/Membres';
import Supplements from './pages/Supplemets';
import Sales from './pages/Sales';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Register from './pages/Register';
import PrivateRoutes from './utils/PrivateRoutes';
import CheckRoute from './utils/CheckRoute';
import SharedState from './context/MembreContext';
import { useState } from 'react';

function App() {
  
  const token = localStorage.getItem("token")

  const [membreAdded, setMembreAdded] = useState(false)
  const [membreUpdated, setMembreUpdated] = useState(false)
  const [productAdded, setProductAdded] = useState(false)
  const [saleAdded, setSaleAdded] = useState(false)
  const [saleDeleted, setSaleDeleted] = useState(false)
  const [productDeleted, setProductDeleted] = useState(false)
  const [membreDeleted, setMembreDeleted] = useState(false)
  

  return (
<>
      
<SharedState.Provider value={{
        membreAdded,
        setMembreAdded,
        membreUpdated,
        setMembreUpdated,
        membreDeleted,
        setMembreDeleted,
        productAdded,
        setProductAdded,
        saleAdded,
        setSaleAdded,
        productDeleted,
        setProductDeleted,
        saleDeleted,
        setSaleDeleted
}}>

    <Router>

      {token?.length > 0 ? <Sidebar/> : ""}
    
    <div className='app'>
      <Routes>

        <Route element={<CheckRoute />} >
          <Route path='/auth' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>

        
              <Route path='/' element={ <PrivateRoutes> <Home/> </PrivateRoutes>} />
              <Route path="/home" element={<PrivateRoutes> <Home/> </PrivateRoutes>} />
              <Route path="/statistiques" element={<PrivateRoutes> <Statis/> </PrivateRoutes>} />
              <Route path="/membres" element={<PrivateRoutes> <Membres/> </PrivateRoutes>} />
              <Route path="/supplements" element={<PrivateRoutes> <Supplements/> </PrivateRoutes>} />
              <Route path="/sales" element={<PrivateRoutes> <Sales/> </PrivateRoutes>} />
              <Route path="/admin" element={<PrivateRoutes> <Admin/> </PrivateRoutes>} />
      
        
      </Routes>
      </div>
    </Router>  

</SharedState.Provider>

    <div><Toaster/></div>
    </>
  );
}

export default App;
