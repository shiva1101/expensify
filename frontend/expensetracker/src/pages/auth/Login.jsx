import React,{useState} from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/layouts/Inputs/Input";
import { validateEmail } from '../../utils/helper';
import api from '../../utils/api';
import { AUTH } from '../../utils/apipaths';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState(null);
  const navigate = useNavigate();
  // Handle Login form Submit
  const handleLogin = async (e) =>{
      e.preventDefault();

      if(!validateEmail(email)){
        setError("please enter a valid email address.");
        return;
      }
      if(!password){
        setError("Please enter the password");
        return;
      }
      setError("");

      // Login API Call
      try{
        const { data } = await api.post(AUTH.login, { email, password });
        if(data?.token){
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        }
      }catch(err){
        const msg = err?.response?.data?.message || 'Login failed';
        setError(msg);
      }
  };
  return (
    <Authlayout>
    <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
    <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
    <p className="text-xs text-slate-700 mt-[5px] mb-6">
      Please enter your details to log in
    </p>
    <form onSubmit={handleLogin}>
      <Input
      value={email}
      onChange={({target})=>setEmail(target.value)}
      label="Email Address"
      placeholder="kane@example.com"
      type="text"
      />

       <Input
      value={password}
      onChange={({target})=>setPassword(target.value)}
      label="Password"
      placeholder="Min 8 Characters"
      type="password"
      />

    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

    <button type="submit" className="btn-ptimary">
      LOGIN
    </button>
    
    <p className="text-[13px] text-slate-800 mt-3">
      Don't have an account?{" "}
      <Link className="font-medium text-primary underline" to="/signup">
      SignUp
      </Link>
    </p>
    </form>
    </div>
    </Authlayout>
  );
};

export default Login
