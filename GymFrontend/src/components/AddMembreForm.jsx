
import { React,useContext, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { decodeToken } from "react-jwt"
import SharedState from '../context/MembreContext'
import { Spinner } from 'react-bootstrap'

function AddMembreForm(props) {

    const {setMembreAdded} = useContext(SharedState)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
      } = useForm()

     const onSubmit = async (data) => {   

        setIsLoading(true)
        
        const token = localStorage.getItem("token")
        const decoded = decodeToken(token)

        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/save/${decoded.sub}`, data, 
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
                        setMembreAdded(prevValue => !prevValue)
                        setIsLoading(false)
                        props?.setDisplay(false)
                    })  
                    .catch(errors => {
                        errors?.response?.status === 502 ? toast.error("Adresse mail déjà existante !")
                        : toast.error(errors?.message)
                        setIsLoading(false)
                    })
     }

     const closeForm = () =>{
        props?.setDisplay(false)
     }

  return (

    
   
     <Offcanvas show={props?.display} onHide={closeForm} placement='end' scroll="true" className="offCanvas"> 
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
                    {errors.nom && <p className='text text-danger mt-2'>{errors?.nom?.message}</p>}        
             </div>

             <div className='col form-floating'>  
                    
                    <input type='text' 
                            {...register('prenom', {required: "Veuillez saisir le prenom"})} 
                            className='form-control' 
                            placeholder="Veuillez écrire le prénom..." 
                            id="fname" />
                    {errors.prenom && <p className='text text-danger mt-2'>{errors?.prenom?.message}</p>}   
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
                    {errors.email && <p className='text text-danger mt-2'>{errors?.email?.message}</p>}  
                    <label for="email" className='form-label'>
                        E-mail Adresse
                    </label>       
             </div>
             <div className='row mb-3'>
                <div className='col form-floating'>
                    
                    <input type='text' 
                            {...register('telephone')}
                            className='form-control' 
                            placeholder="Téléphone..."
                            id="telephone" />
                    <label for="telephone" className='form-label nomInput'>
                        Téléphone
                    </label>        
                </div>            
                <div className='col form-floating'>
             
                    
                    <input type='text' 
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
                     
                     {isLoading ? 
                     <div><Spinner animation='border' size='sm' as="span" /> <span> Loading...</span></div>
                     : 'Ajouter membre'}
                     </button>
             </div>
        </form> 
        </div>       
           
     </div>        
     </Offcanvas>
  )
}

export default AddMembreForm