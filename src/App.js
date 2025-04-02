import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Login/AuthContext ';
import Login from './Components/Login';
import Userpage from './Components/UserPage';
import AuthenticatedRoute from './Login/AuthenticatedRoute ';
import './App.css';

const App = () => {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          {/* Protect routes with the AuthenticatedRoute component */}
          <Route path='/users' element={<AuthenticatedRoute><Userpage /></AuthenticatedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;



