
import { React, useCallback, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { decodeToken } from "react-jwt"

function AddMembreForm(props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {isLoading, errors}
      } = useForm()

     const onSubmit = async (data) => {   
        
        const token = localStorage.getItem("token")
        const decoded = decodeToken(token)
        const jsondata = JSON.stringify(data)

        await axios.post(`http://localhost:8081/api/v1/membres/save/${decoded.sub}`, jsondata, 
                         {
                            headers: {
                                    "Content-Type": "Application/json",
                                    "Authorization": `Bearer ${token}`
                            }  
                        }
                        ) 

                    .then(response =>{
                        response?.status === 200 && toast.success('Membre ajouté')
                        reset()                        
                        setTimeout(() => {
                              window.location.reload()  
                        }, 1500)
                    })  
                    .catch(errors => {
                        errors?.response?.status === 400 && toast.error("Adresse mail déjà existante !")
                        toast.error(errors?.message)
                    })
     }

     const closeForm = () =>{
        props.setDisplay(false)
     }

  return (

    
   
     <Offcanvas show={props.display} onHide={closeForm} placement='end' scroll="true" backdrop="true" className="offCanvas"> 
     <div className='compte-container'>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Créer un Membre</Offcanvas.Title>
         </Offcanvas.Header>


        <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className='form'>
            
            <div className='row mb-3'>
             <div className='col form-floating'> 
                    
                    <input type='text'
                            {...register('nom', {required: "Veuillez saisir le nom"})}
                            className='form-control' 
                            placeholder="Veuillez écrire le nom..."
                            id="lname" />
                    <label for="lname" className='form-label nomInput'>
                        Nom
                    </label>        
                    {errors.nom && <p className='text text-danger mt-2'>{errors.nom.message}</p>}        
             </div>

             <div className='col form-floating'>  
                    
                    <input type='text' 
                            {...register('prenom', {required: "Veuillez saisir le prenom"})} 
                            className='form-control' 
                            placeholder="Veuillez écrire le prénom..." 
                            id="fname" />
                    {errors.prenom && <p className='text text-danger mt-2'>{errors.prenom.message}</p>}   
                    <label for="fname" className='form-label nomInput'>
                        Prénom
                    </label>      
             </div>
             </div> 
             <div className='email-div form-floating mb-3'>
                    
                    <input type='mail' 
                            {...register('email', {required: "Veuillez saisir une adresse mail"})}
                            className='form-control' 
                            placeholder="Adresse email..." 
                            id="email" />
                    {errors.email && <p className='text text-danger mt-2'>{errors.email.message}</p>}  
                    <label for="email" className='form-label'>
                        E-mail Adresse
                    </label>       
             </div>
             <div className='row mb-3'>
                <div className='col form-floating'>
                    
                    <input type='number' 
                            {...register('telephone')}
                            className='form-control' 
                            placeholder="Téléphone..."
                            id="telephone" />
                    <label for="telephone" className='form-label nomInput'>
                        Téléphone
                    </label>        
                </div>            
                <div className='col form-floating'>
             
                    
                    <input type='number' 
                            {...register('age')}
                            className='form-control' 
                            placeholder="age..."
                            id="age" />

                    <label for="age" className='form-label nomInput'>
                        Age
                    </label>        
                </div>            
             </div>
             <div className='adresse-div form-floating mb-4'>
                    
                    <input type='text' 
                            {...register('adresse')}
                            className='form-control' 
                            placeholder="Adresse postale..."
                            id="adresse" />

                    <label for="adresse" className='form-label'>
                        Adresse: 
                    </label>        
             </div>
 
             <div className='submit-btn mb-4'>
                 <button 
                     className='btn btn-success'
                     disabled={isLoading}>
                     Valider</button>
             </div>
        </form> 
        </div>       
           
     </div>        
     </Offcanvas>
  )
}

export default AddMembreForm