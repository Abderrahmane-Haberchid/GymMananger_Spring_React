import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-bootstrap/Modal';
import '../css/actionsContent.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button, Spinner } from 'react-bootstrap';
import { decodeToken } from 'react-jwt';
import SharedState from '../context/MembreContext';

function ModalDeletePayment(props) {

    const { setMembreUpdated } = useContext(SharedState)

    const token = localStorage.getItem("token")
    const decodedToken = decodeToken(token)
    const [pending, setPending] = useState(true)

    const [paymentDetail, setPaymentDetail] = useState({})

    //Disabling Supprimer button after deleting the payment
    const [disableBtn, setDisableBtn] = useState(false)

    let pId = props.paymentId == "" ? "" : props.paymentId
    let membreId = props.membreId

    // Fetching payment By ID
    const fetchPaymentById = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/payments/all/${pId}`, 
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
        setDisableBtn(true)
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/user/deletePayment/id/${pId}/email/${decodedToken.sub}/membreId/${membreId}`,
            {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(res => {
            res.status === 200 && toast.success("Paiement Supprimé !")
            setMembreUpdated(prevState => !prevState)
            setDisableBtn(false)
        } 
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
                                    value={paymentDetail?.type_abonnement}
                                    disabled
                            />
                        </div>
                        
                        <div className='abtInput'>
                            <input type='text'
                                   value={paymentDetail?.type_paiement} 
                                   className='abtInput-text'
                                   disabled
                            />
                        </div>
                        <div className='abtInput'>
                            <input 
                                type='text' 
                                value={paymentDetail?.prix}
                                className='abtInput-text' 
                                disabled
                                />    
                        </div>
                      
            </form>
            }              
            </div>
    </Modal.Body>
    <Modal.Footer>
      <Button 
        className='btn btn-danger' 
        onClick={deletePaymentById}
        disabled = {disableBtn}
        >
            {disableBtn ? 
                <div> <Spinner animation="border" size="sm" as="span" /> <span>Loading...</span> </div> 
                : 'Supprimer'}
        </Button>  
      <Button onClick={props.onHide}>Fermer</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalDeletePayment

