import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import './actionsContent.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import { decodeToken } from 'react-jwt';

function ModalPaymentDetail(props) {

    const token = localStorage.getItem("token")
    const decodedToken = decodeToken(token)
    const [pending, setPending] = useState(true)

    const [paymentDetail, setPaymentDetail] = useState({})

    let pId = props.paymentId == "" ? "" : props.paymentId
    let membreId = props.membreId

    console.log(membreId)

    // Fetching payment By ID
    const fetchPaymentById = async () => {
        await axios.get(`http://localhost:8081/api/v1/payments/all/${pId}`, 
                {
                    headers:{
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(res => {
                setPaymentDetail(res.data)
                setPending(false)
            }
                   
            ).catch(err =>
                    toast.error(err.response.status)
            )
    }

    const deletePaymentById = async () => {
        console.log("delete buttin clicked")
        await axios.delete(`http://localhost:8081/api/v1/user/deletePayment/id/${pId}/email/${decodedToken.sub}/membreId/${membreId}`,
            {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(res => 
            res.status === 200 && toast.success("Paiement Supprimé !")
        )
        .catch(err =>
            toast.error(`Une erreur est générée ! ${err.status}`)
        )
    }


   useEffect(() => {
       pId != 0 && fetchPaymentById() 
   }, [pId])


  return (
    <Modal
    {...props}
    size="l"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Supprimer ce paiement !
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className='actions-content'>    
            <center>{ pending === true && 
                        <Spinner animation="grow" 
                                style={{'display': 'flex', 'justifyContent': 'center'}} />
                    }            
            </center>    
            {pending === false && 
            <form className='classForm'>                  
                                        
                        <div className='abtInput'>
                            <input 
                                    type='text'
                                    className='abtInput-text'
                                    value={paymentDetail.type_abonnement}
                                    disabled
                            />
                        </div>
                        
                        <div className='abtInput'>
                            <input type='text'
                                   value={paymentDetail.type_paiement} 
                                   className='abtInput-text'
                                   disabled
                            />
                        </div>
                        <div className='abtInput'>
                            <input 
                                type='text' 
                                value={paymentDetail.prix}
                                className='abtInput-text' 
                                disabled
                                />    
                        </div>
                      
            </form>
            }              
            </div>
    </Modal.Body>
    <Modal.Footer>
      <Button className='btn btn-danger' onClick={deletePaymentById}>Supprimer</Button>  
      <Button onClick={props.onHide}>Fermer</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalPaymentDetail

