import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import "../css/login.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate()

  const {
    register,
    reset,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmitLogin = (dataLogin) => {

    axios.post("http://localhost:8081/api/v1/auth/login", 
              dataLogin,
              {
                headers: 
                {'content-Type': 'application/json'}
              }
              )
          .then(response => {

                      if(response.status === 200){
                        toast.success("Bienvenue au tableau de bord !")
                        localStorage.setItem("token", response.data.token)
                        setTimeout(() => {
                          window.location.reload()
                        }, 1000)
                        
                      } 
                      
                    
          })
          .catch(errors => {
            errors.response.status === 403 ? toast.error("Login or Password incorrect !") : toast.error("An error has occured ! "+ errors.response.status) 
          })
}

  return (
    
    <div className="container" id="container">

   
    <div className="form-container sign-in">
        <form onSubmit={handleSubmit(onSubmitLogin)}>
            <h1>Sign In</h1>
            <div className="social-icons">
                <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input type="text"
                    {...register("email")}
                   placeholder="Email" />
            <input type="password" 
                   {...register("password")} 
                   placeholder="Password" />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>

            <h2>Don't have an account ?</h2><h2><Link to="/register">Register now</Link></h2>
        </form>
    </div>
   
</div>

  )
}