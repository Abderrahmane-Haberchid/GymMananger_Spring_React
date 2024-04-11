
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Sidebar from './components/Sidebar'
import Statis from './pages/Statis';
import Membres from './pages/Membres';
import Supplements from './pages/Supplemets';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Register from './pages/Register';
import PrivateRoutes from './utils/PrivateRoutes';
import CheckRoute from './utils/CheckRoute';

function App() {
  
  const token = localStorage.getItem("token")

  return (

    
<>
      <div><Toaster/></div>
      

    <Router>

      {token === "" ? "" : <Sidebar/>}
    
    <div className='app'>
      <Routes>

        <Route element={<CheckRoute />} >
          <Route path='/auth' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>

        <Route element={<PrivateRoutes />} >
              <Route path='/' element={<Home/>} />
              <Route path='/gym-dashboard' element={<Home/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/statistiques" element={<Statis />} />
              <Route path="/membres" element={<Membres />} />
              <Route path="/supplements" element={<Supplements />} />
              <Route path="/admin" element={<Admin />} />
        </Route> 
        
      </Routes>
      </div>
    </Router>  
    </>
  );
}

export default App;
