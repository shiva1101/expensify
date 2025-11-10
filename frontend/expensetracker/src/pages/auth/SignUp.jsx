import React,{useState} from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/layouts/Inputs/Input";
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from "../../components/layouts/Inputs/ProfilePhotoSelector";
import api from '../../utils/api';
import { AUTH } from '../../utils/apipaths';

const SignUp = () => {
  const [profilePic, setProfilePic]=useState(null);
  const [fullName, setFullName]=useState("");
  const [email, setEmail]=useState("");
  const [password,setPassword] = useState("");

  const [error,setError] =useState(null);

  const navigate = useNavigate();

  // Handle Sign Up form submit 
  const handleSignUp =async (e)=>{
    e.preventDefault();

    let profileImageUrl ="";

    if(!fullName){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    try{
      // 1) Upload image if provided
      if(profilePic){
        const formData = new FormData();
        formData.append('image', profilePic);
        const { data: uploadRes } = await api.post(AUTH.uploadImage, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        profileImageUrl = uploadRes?.imageUrl || "";
      }

      // 2) Create user
      const { data } = await api.post(AUTH.register, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      if(data?.token){
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    }catch(err){
      const msg = err?.response?.data?.message || 'Sign up failed';
      setError(msg);
    }
  }


  return (
    <Authlayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
       <h3 className="text-xl font-semibold text-black">Create an Account</h3>
       <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
       </p>

       <form onSubmit={handleSignUp}>
        

       <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Input 
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
           type="text" 
           />
       <Input
      value={email}
      onChange={({target})=>setEmail(target.value)}
      label="Email Address"
      placeholder="kane@example.com"
      type="text"
      />
      <div className="col-span-2">
       <Input
      value={password}
      onChange={({target})=>setPassword(target.value)}
      label="Password"
      placeholder="Min 8 Characters"
      type="password"
      />
        </div>
         </div>

         {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
         
          <button type="submit" className="btn-ptimary">
               SIGN UP
           </button>
             
            <p className="text-[13px] text-slate-800 mt-3">
               Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login">
               Login
              </Link>
            </p>
       </form>
      </div>
    </Authlayout>
  );
};

export default SignUp
