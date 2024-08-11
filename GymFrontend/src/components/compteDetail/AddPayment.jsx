import React, { useContext, useEffect, useState } from 'react'
import '../../css/addpayment.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { decodeToken } from 'react-jwt'
import SharedState from '../../context/MembreContext'
import { Button, Spinner } from 'react-bootstrap'

function AddPayment(props) {

    const {setMembreUpdated} = useContext(SharedState)

    const [payments, setPayments] = useState(false)
    const [loading, setLoading] = useState(false)

    const id = props.membreId
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const token = localStorage.getItem("token")
    const decodedToken = decodeToken(token)


    // Add payment method
    const onSubmit = async (data) => {
        setLoading(true)
        const jsonData = JSON.stringify(data)
        
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/add_payment/${id}/${decodedToken.sub}`,
                                 jsonData, 
                                 {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    }
                                })
                .then(response => {
                    response.status === 200 && toast.success("Paiement validé!")
                    console.log(data)
                    setMembreUpdated(prevState => !prevState)
                    setLoading(false)
                })
                .catch(errors => {
                    errors.response.status === 400 && toast.error("Une erreur s'est produite!")
                    setLoading(false)
                })
    }
    // Checking if this is a new membre 
   
    const isNewMembre = async () => {
         await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/id/${id}`, 
                       {
                        headers: {
                            'Content-Type': 'Application/json',
                            Authorization: `Bearer ${token}`
                        }
                       } 
                ).then(res => {
                    res.data.paiementsSet.length > 0 ? setPayments(true) : setPayments(false)
                })
    }

    useEffect(() => {
        isNewMembre()
         
    }, [])
  return (
    <div className='addpayment-wrapper'>        
            
    <form className='addpayment-form-container' onSubmit={handleSubmit(onSubmit)}>                  
                                
                <div className='type-abonnement-select'>
                    <select
                     {...register("type_abonnement")}   
                     className='form-control'>
                        <option selected>Choisir un abonnement...</option>
                        <option>Basic + Tapis Roulant</option>
                        <option>Basic + Coach</option>
                        <option>Basic + Coach + Tapis Roulant</option>
                        <option>Basic</option>
                    </select>
                </div>
                
                <div className='type-payment-select'>
                    <select 
                        {...register("type_paiement")} 
                        className='form-control'>
                        <option selected>Choisir un paiement...</option>    
                        <option>Une séance</option>
                        <option>Mensuel</option>
                        <option>Par 3mois</option>
                        <option>Par 6mois</option>
                        <option>Annuel</option>
                    </select>
                </div>
                <div className='prix-input'>
                    <input 
                        {...register("prix", {required: "Veuillez saisir le prix"})}
                        type='number' 
                        placeholder='Saisir le prix à payer...' 
                        className='form-control' />
                    {errors.prix && <p className='text text-danger mt-2'>{errors.prix.message}</p>}     
                </div>
                <div className='checkDate'>
                    <label for="startDate">Commencer la facturation à partir de ce jour ?</label>
                    <input 
                        {...register("dontkeepExpDate")}
                        type='checkbox'  
                        id='startDate'
                        {...payments == true ? "" : "disabled"}
                        checked={payments == true ? "false" : "true"}
                        />
                            
                </div>   
                <div className='abtInput'>             
                <Button 
                       type='submit' 
                       disabled={loading} >
                       {
                        loading ?
                                <div><Spinner animation='border' as='span' size='sm' /><span> Loading...</span></div>
                                : 'Valider paiement'
                       }
                </Button>       
                </div>
    </form>
                  
    </div>
  )
}

export default AddPayment