import React, { useContext, useEffect, useState } from 'react'
import '../../css/actionsContent.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';
import SharedState from '../../context/MembreContext';
import { Button } from 'react-bootstrap';

function UpdateMembre(props) {

    const { setMembreUpdated, membreUpdated } = useContext(SharedState)

    const [membre, setMembre] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)

    const id = props.membreId

    const loadMembre = async () => {
        setLoading(true)
        const token = localStorage.getItem("token")

        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/id/${id}`,
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
                        setLoading(false)
                    })
                    .catch(err => {
                        toast.error('Une erreur a été générée! Merci de réessayer plus tard')
                        setLoading(false)
                    })
    }

    useEffect(() => {
        loadMembre()
    }, [membreUpdated])
    
        
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
      } = useForm()

      const onSubmit = async (data) => {
            const jsonData = JSON.stringify(data)
            const token = localStorage.getItem('token')
            
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/edit/${id}`, 
                                jsonData, 
                                {
                                    headers: {
                                            'Content-Type': 'application/json',
                                             'Authorization': `Bearer ${token}`,   
                                        }
                                })       
                    .then(response => {
                        response.status === 200 && toast.success('Membre modifié!')  
                        setMembreUpdated(prevState => !prevState)                       
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
                
                <div className='form-floating prenomInput'>
                    <input type='text'
                           {...register('prenom', {required: "Veuillez saisir le prenom"})}
                           className='form-control' 
                           {...setValue('prenom', membre.prenom)}
                           />
                           <label for="floatingNom">Prenom</label>
                    {errors.prenom && <p className='text text-danger mt-2'>{errors.prenom.message}</p>}       
                </div>

                <div className='form-floating nomInput'>
                    <input type='text' 
                           {...register('nom', {required: "Veuillez saisir le nom"})} 
                           className='form-control' 
                           {...setValue('nom', membre.nom)}
                           />
                    <label for="floatingNom">Nom</label>       
                    {errors.nom && <p className='text text-danger mt-2'>{errors.nom.message}</p>}       
                </div>
                
                <div className='form-floating emailInput'>
                    <input type="mail" 
                            className='form-control'
                            {...register('email', {required: "Veuillez saisir une adresse mail"})}
                            {...setValue('email', membre.email)}
                            />
                        <label for="floatingNom">Email</label>    
                     {errors.email && <p className='text text-danger mt-2'>{errors.email.message}</p>}       
                </div>
                <div className='form-floating adresseInput'>
                    <input type='text'
                           {...register('adresse')} 
                           className='form-control' 
                           {...setValue('adresse', membre.adresse)}
                           />
                           <label for="floatingNom">Adresse</label>
                </div>
                
                <div className='form-floating ageInput'>
                    <input type='number'
                           {...register('age')}
                           className='form-control'
                           {...setValue('age', membre.age)}
                           />
                        <label for="floatingNom">Age</label>   
                </div>
                <div className='form-floating telephoneInput'>
                    <input type='number' 
                           {...register('telephone')} 
                           className='form-control'
                           {...setValue('telephone', membre.telephone)}
                            /> 
                        <label for="floatingNom">Telephone</label>      
                </div>
                <br />                
                <Button 
                    type='submit'
                    disabled={loading}
                    >
                    {
                        loading ? 
                                <div><Spinner animation='border' size='sm' as='span' /><span> Loading...</span></div>
                                : 'Mettre à jour'
                    }        
                </Button>
    </form>
      }             
    </div>
  )
}

export default UpdateMembre