import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import "../css/login.css";

function Register() {

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmitRegister = (dataRegister) => {

        const resgiterData = JSON.stringify(dataRegister)
       // const signIn = useSignIn()

        axios.post("http://localhost:8081/api/v1/auth/register", 
                  resgiterData,
                  {headers: {'content-Type': 'application/json'}}
                  )
              .then(res => {
                if(res.status === 200){ 
                    
                    localStorage.setItem("token", res.data.token)

                    toast.loading("Votre compte est en cours de création...")

                    setTimeout(() => {
                        toast.success("Compte est créé avec succes !")
                 }, 2000)

                    setTimeout(() => {
                           window.location.reload() 
                    }, 3500)
                }
                               
              })
              .catch(errors => {
                 toast.error("An error has occured, please try again later !")
              })
              
  }

  return (

    <div className="container" id="container">

   
    <div className="form-container sign-in">
    
    <form onSubmit={handleSubmit(onSubmitRegister)}>
        <h1>Create Account</h1>
        <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registeration</span>
        <input type="text"
               {...register('username',
                         {required: 'Username Requis', 
                         minLength: {
                            value: 4,
                            message: "Username trop court!",
                          },
                        }         
               )} 
               placeholder="Gym Club Name" 
            />
        {errors.username && <p className='text text-danger mt-2'>{errors.username.message}</p>}      

        <input type="mail"
               {...register('email', {
                required: 'Email Requis',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Addresse mail invalide !',
                },
              })}  
               placeholder="Email" 
            />
        {errors.email && <p className='text text-danger mt-2'>{errors.email.message}</p>}      

        <input type="password" 
               {...register('password', 
                            {required: 'Password Requis', 
                            minLength: {
                                value: 4,
                                message: "Password trop court!",
                              },
                            }
                            )} 
               placeholder="Password" 
            />
        {errors.password && <p className='text text-danger mt-2'>{errors.password.message}</p>}      
        <button>Sign Up</button>
    </form>
    </div>
    </div>
  )
}

export default Register