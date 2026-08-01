import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Autnentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext'; 

function App() {
  return (
   <>

    <Router>

      <AuthProvider>
      <Routes>
         <Route path='/' element={<LandingPage />} />
         <Route path='/auth' element={<Autnentication />} />
      </Routes>
      </AuthProvider>
    </Router>



   </>
  )
}

export default App;
