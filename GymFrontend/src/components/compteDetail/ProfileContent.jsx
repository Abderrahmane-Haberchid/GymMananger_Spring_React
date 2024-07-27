import React, { useEffect, useState } from 'react'
import '../../css/compte.css';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';

function ProfileContent(props) {

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
    }, [])

    //checking payment state
    const cssStatut = membre.statut === "Paid" ? "td-payment" : "td-payment-nok"
    
  return (
    <div className='profile-content'>
                    
                    <center>{ spiner === true && <Spinner animation="grow" className='spiner' /> }</center>
                      { spiner === false &&       
                        <table>
                                <tr>
                                  <td><b>Etat du compte</b></td>
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
                               
                        </table>

                       }
                    
                    <br />
                        <div className='btn-desactiver'> 
                        <button className='btn btn-danger'>Supprimer ce membre</button>    
                        </div>
                    
    </div>
  )
}

export default ProfileContent