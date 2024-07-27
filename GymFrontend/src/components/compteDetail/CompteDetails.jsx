import { useState, React, useEffect, useContext } from 'react'
import axios from 'axios'
import ProfileContent from './ProfileContent'
import ActionsContent from './ActionsContent'
import PaymentsContent from './PaymentsContent'
import AddPayment from './AddPayment'
import Offcanvas from 'react-bootstrap/Offcanvas'
import avatar from '../../img/avatar.jpg'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast'
import { ProgressBar } from 'react-bootstrap'
import SharedState from '../../context/MembreContext'

function CompteDetails(props) {

    const {membreUpdated} = useContext(SharedState)

    const [progress, setProgress] = useState({started: false, pc: 0})
    
    const [membre, setMembre] = useState([])
    const [image, setImage] = useState(null)
    

    {/*-----------Account section----------*/}

    const [showProfile, setShowProfile] = useState(true);
    const [showActions, setShowActions] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [addPayment, setAddPayment] = useState(false);    
    
    
    const changeProfile = () => {
      setShowProfile(true)
      setShowActions(false)
      setShowPayments(false)  
      setAddPayment(false)  
    }
    const changeActions = () => {
        setShowProfile(false)
        setShowActions(true)
        setShowPayments(false)  
        setAddPayment(false)  
    }
    const changePayments = () => {
        setShowProfile(false)
        setShowActions(false)
        setShowPayments(true)  
        setAddPayment(false)  
      }
      const changeAddPayments = () => {
        setAddPayment(true)  
        setShowProfile(false)
        setShowActions(false)
        setShowPayments(false)  
      }
      
      let id = props?.idmembre
      const token = localStorage.getItem("token")

      
      const handleUpload = async () => {

        const formData = new FormData()
        formData.append("file", image)
        setProgress((prevState) => ({...prevState, started: true}))

            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/upload/${id}`, formData, 
            {
                onUploadProgress: (eventProgress) => setProgress((prevState) => {
                    return {...prevState, pc: eventProgress.progress*100}
                }),
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            }
            ).then(res => {
                toast.success("Image chargé !")
               
            })
            .catch(errors => {
                toast.error('An error has occured' + errors?.response?.status)
            })
      }

      const loadMembre = async () => {
                
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/id/${id}`, 
                    {
                        headers: {
                            "Content-Type": "Application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                )
               .then(response => {
                    setMembre(response.data)
               })
               .catch(errors =>{
                  // toast.error('Une erreur a été générée : ' + errors?.response?.status)
               })
}

      useEffect(()=>{
         loadMembre()

         setProgress((previousState) => {
            return {...previousState, started: false}
          })

      }, [id, membreUpdated])

  return (

     <Offcanvas {...props} placement='end' className="offCanvas offCanvas-end">
        
     <div className='compte-container'>
     {progress.started && <ProgressBar now={progress.pc} label={progress.pc} />}
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Détail Compte</Offcanvas.Title>
         </Offcanvas.Header>
         
           
             <center>
             <div className='compte-container-header'>
            <img src={membre.image !== "" ? `https://gympics.s3.eu-north-1.amazonaws.com/${membre.image}` : avatar}  
                    style={{width:"90px", height:"90px", backgroundImage:"cover"}} 
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" /> 
                 
                 <p style={{fontWeight: "700"}}>{membre.prenom} {membre.nom}</p> 

             </div>  

             <Dropzone onDrop={acceptedFiles => {
                setImage(acceptedFiles[0]);
                handleUpload();
                }    
                }>
                    {({getRootProps, getInputProps}) => (
                        <section style={{cursor: "pointer"}}>
                        <div {...getRootProps()} onDrop={handleUpload}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop une image ici ou click pour selectionner</p>
                        </div>
                        </section>
                    )}
             </Dropzone>

             

             </center>  
             <div className='compte-container-body-btn'>
                 <Link to=""
                     className="profile-btn"
                     onClick={changeProfile}
                     >Profile
                 </Link>
                 <Link to="" 
                     className="actions-btn"
                     onClick={changeActions}
                     >Update
                 </Link>
                 <Link to=""
                     className="payments-btn"
                     onClick={changeAddPayments}
                     >Paiments
                 </Link>
                 <Link to=""
                     className="payments-btn"
                     onClick={changePayments}
                     >Historique ({membre?.paiementsSet?.length})
                 </Link>
                
             </div>
             <hr />
             <div className='compte-container-body'>
               { showProfile && <ProfileContent membreId = {props.idmembre} /> }
               { showActions && <ActionsContent membreId = {props.idmembre} /> }
               { showPayments && <PaymentsContent membreId = {props.idmembre} /> }
               { addPayment && <AddPayment membreId = {props.idmembre} /> }
            </div>  
 
           </div>
       </Offcanvas>
        
  )
}

export default CompteDetails