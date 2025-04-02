import {useState} from 'react';
import { useAuth } from '../Login/AuthContext ';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState(false);
  const [error, setError] = useState(false); 
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setError(false)
    setValidateEmail(false)
  }


  const handlePassword = (e) => {
    setPassword(e.target.value)
    setError(false)
    setValidatePassword(false)
  }
 
  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log('email ==>', email);
    // console.log('password ==>', password);

    // Email validation regex (must be lowercase to work correctly)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const pattern = /^(?=.*[A-Z]).{9,}$/;

    // Check if email is empty or invalid
    if (!email.trim() || !emailRegex.test(email)) {
        setError(true);
        setValidateEmail(true);
        return;  // Stop execution if validation fails
    } else if (!password.trim() || !pattern.test(password)) {
      setError(true);
      setValidatePassword(true);
    }

    // Try logging in
    try {
        const successLogin = await login(email, password);
        // console.log('successLogin ==>', successLogin)
        if (successLogin) {
          console.log('navigate')
            navigate('/users');
        } else {
            setError(true); // Handle failed login
        }
    } catch (error) {
        console.error("Login error:", error);
        setError(true);
    }
};

  return(
    <div className='test d-flex justify-content-center align-items-center min-vh-100 bg-light'>
      <div className='card' style={{ width: "24rem"}}>
        <div className='card-body'>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Email</label>
            <div className="col-sm-8">
              <input type="text" className={`form-control ${validateEmail ? 'invalid' : ''}`}  id="staticEmail" value={email} onChange={handleEmail} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Password</label>
            <div className="col-sm-8">
              <input type="password" className={`form-control ${validatePassword ? 'invalid' : ''} `} id="inputPassword" value={password} onChange={handlePassword} />
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={handleLogin}>Login</button>
          </div>
          {error ? <div className='text-danger'>Login failed!</div> : null }
        </div>
      </div>
    </div>
  )
}

export default Login;