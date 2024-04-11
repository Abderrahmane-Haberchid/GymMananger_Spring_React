import React, { useEffect, useState } from 'react'
import './actionsContent.css';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';

function ActionsContent(props) {

    const [membre, setMembre] = useState([])
    const [pending, setPending] = useState(true)

    const id = props.membreId

    const loadMembre = async () => {
        const token = localStorage.getItem("token")

        await axios.get(`http://localhost:8081/api/v1/membres/id/${id}`,
                        {
                        headers: {
                            "Content-Type": "Application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                        )
                    .then(res => {
                        setMembre(res.data)  
                        setPending(false)     
                    })
    }

    useEffect(() => {
        loadMembre()
    }, [])
    
        
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
      } = useForm()

      const onSubmit = async (data) => {
            const jsonData = JSON.stringify(data)
            const token = localStorage.getItem('token')
            
            await axios.put(`http://localhost:8081/api/v1/membres/edit/${id}`, 
                                jsonData, 
                                {
                                    headers: {
                                            'Content-Type': 'application/json',
                                             'Authorization': `Bearer ${token}`,   
                                        }
                                })       
                    .then(response => {
                        response.status === 200 && toast.success('Membre modifié!')  
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)                         
                    })
                    .catch(errors => {
                        errors.data && toast.error("Une erreur s'est produite."+ errors.response.status)
                    })
      }

  return (
    <div className='actions-content'>     
    
    <center>{ pending === true && <Spinner animation="grow" className='spiner' /> }</center>   

     { pending === false &&        
    <form className='classForm' onSubmit={handleSubmit(onSubmit)}>                  
                <div className='form-floating nomInput'>
                    <input type='text' 
                           {...register('nom', {required: "Veuillez saisir le nom"})} 
                           className='form-control nomInput-text' 
                           {...setValue('nom', membre.nom)}
                           id='floatingNom'
                           />
                    <label for="floatingNom">Nom</label>       
                    {errors.nom && <p className='text text-danger mt-2'>{errors.nom.message}</p>}       
                </div>
                <div className='form-floating prenomInput'>
                    <input type='text'
                           {...register('prenom', {required: "Veuillez saisir le prenom"})}
                           className='form-control prenomInput-text' 
                           {...setValue('prenom', membre.prenom)}
                           id='floatingNom'
                           />
                           <label for="floatingNom">Prenom</label>
                    {errors.prenom && <p className='text text-danger mt-2'>{errors.prenom.message}</p>}       
                </div>
                
                <div className='form-floating abtInput'>
                    <input type="mail" 
                            className='form-control abtInput-text'
                            {...register('email', {required: "Veuillez saisir une adresse mail"})}
                            {...setValue('email', membre.email)}
                            />
                        <label for="floatingNom">Email</label>    
                     {errors.email && <p className='text text-danger mt-2'>{errors.email.message}</p>}       
                </div>
                <div className='form-floating adrInput'>
                    <input type='text'
                           {...register('adresse')} 
                           className='form-control adrInput-text' 
                           {...setValue('adresse', membre.adresse)}
                           />
                           <label for="floatingNom">Adresse</label>
                </div>
                
                <div className='form-floating ageInput'>
                    <input type='number'
                           {...register('age')}
                           className='form-control ageInput-text'
                           {...setValue('age', membre.age)}
                           />
                        <label for="floatingNom">Age</label>   
                </div>
                <div className='form-floating telephoneInput'>
                    <input type='number' 
                           {...register('telephone')} 
                           className='form-control ageInput-text'
                           {...setValue('telephone', membre.telephone)}
                            /> 
                        <label for="floatingNom">Telephone</label>      
                </div>
                <br />                
                <button className='btn btn-success'>Modifier</button>
    </form>
      }             
    </div>
  )
}

export default ActionsContent