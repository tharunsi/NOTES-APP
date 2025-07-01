import React,{useState} from 'react';
import './Signup.css';
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/ContextProvider';

const Login = () => {
   
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const {login} = useAuth()
    const API = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${API}/api/auth/login`,{email,password})
            console.log(response)

            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate('/')
              }
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className="signup-container-profile-view">
      <div className="signup-box-profile-view">
        <h2 className="signup-title-profile-view">Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group-profile-view">
            <label htmlFor="email" className="label-profile-view">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="input-profile-view"
              required
            />
          </div>

          <div className="form-group-profile-view">
            <label htmlFor="password" className="label-profile-view">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="input-profile-view"
              required
            />
          </div>

          <button type="submit" className="signup-button-profile-view">
            Login
          </button>
        </form>

        <p className="login-link-profile-view">
          Don't Have Account?
          <NavLink to="/register" className="link-profile-view">Signup</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
