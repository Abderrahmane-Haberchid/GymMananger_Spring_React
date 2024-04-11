import React, { useEffect, useState } from 'react'
import './actionsContent.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { decodeToken } from 'react-jwt'

function AddPayment(props) {

    const [payments, setPayments] = useState(false)

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
        const jsonData = JSON.stringify(data)
        
        await axios.post(`http://localhost:8081/api/v1/membres/add_payment/${id}/${decodedToken.sub}`,
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
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 1000)
                })
                .catch(errors => {
                    errors.response.status === 400 && toast.error("Une erreur s'est produite!")
                })
    }
    // Checking if this is a new membre 
   
    const isNewMembre = async () => {
         await axios.get(`http://localhost:8081/api/v1/membres/id/${id}`, 
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
    <div className='actions-content'>        
            
    <form className='classForm' onSubmit={handleSubmit(onSubmit)}>                  
                                
                <div className='abtInput'>
                    <select
                     {...register("type_abonnement")}   
                     className='abtInput-text'>
                        <option selected>Basic + Tapis Roulant</option>
                        <option>Basic + Coach</option>
                        <option>Basic + Coach + Tapis Roulant</option>
                        <option>Basic</option>
                    </select>
                </div>
                
                <div className='abtInput'>
                    <select 
                        {...register("type_paiement")} 
                        className='abtInput-text'>
                        <option selected>Mensuel</option>
                        <option>Par 3mois</option>
                        <option>Par 6mois</option>
                        <option>Annuel</option>
                    </select>
                </div>
                <div className='abtInput'>
                    <input 
                        {...register("prix", {required: "Veuillez saisir le prix"})}
                        type='number' 
                        placeholder='Prix à payer' 
                        className='abtInput-text' />
                    {errors.prix && <p className='text text-danger mt-2'>{errors.prix.message}</p>}     
                </div>
                <div className='checkDate'>
                    <label for="startDate">Compter à partir de ce jour</label>
                    <input 
                        {...register("dontkeepExpDate")}
                        type='checkbox'  
                        id='startDate'
                        className='abtInput-text' 
                        {...payments == true ? "" : "disabled"}
                        checked={payments == true ? "false" : "true"}
                        />
                            
                </div>   
                <div className='abtInput'>             
                <input type='submit' 
                       className='btn btn-success' 
                       style={{width:"350px", marginTop:"20px"}} 
                       value="Valider paiments" />
                </div>
    </form>
                  
    </div>
  )
}

export default AddPayment