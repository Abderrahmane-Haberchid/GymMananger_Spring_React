import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import './actionsContent.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { decodeToken } from 'react-jwt'
import { useForm } from 'react-hook-form'
import { Button } from 'react-bootstrap';

function ModalPaymentDetail(props) {

    const token = localStorage.getItem("token")

    const [payments, setPayments] = useState(false)
    const [paymentDetail, setPaymentDetail] = useState({})

    const {
           register,
           handleSubmit,
           formState: {errors}
    } = useForm()

    // Fetching payment By ID
    const fetchPaymentById = () => {
        axios.get(`http://localhost:8081/api/v1/payments/all/${props.paymentId}`, 
                {
                    headers:{
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(res =>
                    setPaymentDetail(res.data)
            ).catch(err =>
                    toast.error(err.status)
            )
    }

    const onSubmit = () => {

    }

     // Checking if this is a new membre 
   
     const isNewMembre = async () => {
        await axios.get(`http://localhost:8081/api/v1/membres/id/${props.membreId}`, 
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
       fetchPaymentById() 
   }, [])


  return (


    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Detail Payment
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className='actions-content'>        
            
            <form className='classForm' onSubmit={handleSubmit(onSubmit)}>                  
                                        
                        <div className='abtInput'>
                            <select
                             {...register("type_abonnement")}   
                             className='abtInput-text'>
                                <option selected>{paymentDetail.type_abonnement}</option>
                                <option >Basic + Tapis Roulant</option>
                                <option>Basic + Coach</option>
                                <option>Basic + Coach + Tapis Roulant</option>
                                <option>Basic</option>
                            </select>
                        </div>
                        
                        <div className='abtInput'>
                            <select 
                                {...register("type_paiement")} 
                                className='abtInput-text'>
                                <option selected>{paymentDetail.type_paiement}</option>
                                <option >Mensuel</option>
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
                                value={paymentDetail.prix}
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
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalPaymentDetail

