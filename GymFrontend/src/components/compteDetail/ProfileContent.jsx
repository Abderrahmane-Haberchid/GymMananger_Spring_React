import React, { useContext, useEffect, useState } from 'react'
import '../../css/compteModal.css';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';
import ModalDeleteMembre from '../../modals/ModalDeleteMembre';
import ModalActivateMembre from '../../modals/ModalActivateMembre';
import SharedState from '../../context/MembreContext';
import { Button } from 'react-bootstrap';

function ProfileContent(props) {

  const { membreUpdated, membreDeleted } = useContext(SharedState)

  // Show Modal confirmation to delete membre, sending membre info to the modal

    const [mbr, setMbr] = useState({
      nom: '',
      email: ''
    })

    const [showModal, setShowModal] = useState(false)

    const handleDeleteMembre = (nom, email) => {
      setMbr({
        nom: nom,
        email: email
      })
      setShowModal(true)
    }

    const handleCloseModal = () => setShowModal(false)

    //===========================================

     // Show Modal confirmation to activate membre, sending membre info to the modal

     const [mbrToAct, setMbrToAct] = useState({
      nom: '',
      email: ''
    })

    const [showModalActivation, setShowModalActivation] = useState(false)

    const handleActivateMembre = (nom, email) => {
      setMbrToAct({
        nom: nom,
        email: email
      })
      setShowModalActivation(true)
    }

    const handleCloseModalActivation = () => setShowModalActivation(false)

    //===========================================


    const [membre, setMembre] = useState([])
    const [spiner, setSpiner] = useState(true)

    const id = props.membreId
    const token = localStorage.getItem("token")

    const fetchUser = async () => {

        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/id/${id}`,
                          {
                            headers: {
                              'Content-Type': 'Application/json',
                              'Authorization': `Bearer ${token}`,
                            }
                          }
                        )
        .then(res => {            
            setMembre(res.data)
            setSpiner(false)
        })
        .catch(error => {
            toast.error(error.response.status)
        })
    }

    useEffect(() => {         
        fetchUser()
    }, [membreUpdated, membreDeleted])

    //checking payment state
    const cssStatut = membre.statut === "Paid" ? "td-payment" : "td-payment-nok"
    
  return (
    <div className='profile-content'>
                    
                    { spiner ? <center><Spinner animation="grow" className='spiner' /></center> 
                      :
                        <table>
                                <tr>
                                  <td><b>Etat financier</b></td>
                                  <td><p id={cssStatut}>{membre.statut}</p></td>
                                </tr>
                                <tr>
                                  <td><b>Date d'inscripton</b></td>
                                  <td>{membre.dateInscription}</td>
                                </tr>
                                <tr>
                                  <td><b>Dérniere MAJ</b></td>
                                  <td>{membre.dateUpdate}</td>
                                </tr>
                                <tr>
                                    <td><b>E-mail</b></td>
                                    <td>{membre.email}</td>
                                </tr>
                                <tr>
                                    <td><b>Téléphone</b></td>
                                    <td>{membre.telephone}</td>
                                </tr>
                                <tr>
                                    <td><b>Adresse</b></td>
                                    <td>{membre.adresse}</td>
                                </tr>
                               
                                <tr>
                                    <td><b>Age</b></td>
                                    <td>{membre.age}ans</td>
                                </tr>
                                {membre.state === "Deleted" && 
                                <tr>
                                  <td colSpan={2}><h3 className='text text-danger'>Ce Compte est désactivé !</h3></td>
                                </tr>
                                }
                               
                        </table>

                       }
                    
                    <br />
                        <div className='btn-desactiver'> 

                        {membre.state === "Actif" &&   
                        <Button 
                            type='submit'
                            onClick={() => handleDeleteMembre(membre.nom, membre.email)}  
                            >
                              <i className="fa-solid fa-trash m-2"></i>
                              Supprimer ce membre</Button>    
                        }      
                        {membre.state === "Deleted" &&   
                        <Button 
                            type='submit'
                            onClick={() => handleActivateMembre(membre.nom, membre.email)}  
                            >
                              <i className="fa-solid fa-check m-2"></i>
                              Activer ce membre
                              </Button>
                         }             
                        </div>

        <ModalDeleteMembre
            membre= {mbr}
            show= {showModal}
            close= {handleCloseModal}
            setShow = {setShowModal}
        />       
         <ModalActivateMembre
            membre= {mbrToAct}
            show= {showModalActivation}
            close= {handleCloseModalActivation}
            setShow = {setShowModalActivation}
        />              
                    
    </div>
  )
}

export default ProfileContent