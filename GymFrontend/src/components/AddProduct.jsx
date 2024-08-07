
import { React, useContext } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { decodeToken } from 'react-jwt'
import '../css/supplements.css';
import SharedState from '../context/MembreContext'
import Spinner from 'react-bootstrap/Spinner';

function AddProducts(props) {

    const { setProductAdded } = useContext(SharedState)

    const [listItem, setListItem] = useState("")
    const [itemType, setItemType] = useState("")
    const [loading, setLoading] = useState(false)

    const supplementsList = ["Protéines", "Gainer", "Vitamines", "Créatine", "Pré-Workout"]
    const proteinType = ["Whey", "Whey ISO", "Whey Hydro", "Caséine"]
    const gainerType = ["Mass Gainer", "Vitargo", "Max Gainer", "CARBS"]
    const vitamineType = ["MultiVitamine", "Omega 3", "Vitamine A", "Zinc", "Vitamine E"]
    const creatineType = ["Monohydrate", "Monohydrate Micronized", "Normal"]
    const preworkoutType = ["C4", "MAX POWER", "5000MG", "HULK"]
    const marque = ["BIOTECH USA", "MUSCLE TECH", "ISO 100", "GOLD STANDARD", "MUSCLETECH Platinum"]

    const {
        register,
        handleSubmit,
        formState: {errors}
      } = useForm()

     const handleSelectedItem = (e) => {
        setListItem(e.target.value)
     }
     const handleSelectedType = (e) => {
        setItemType(e.target.value)
     }

     // Getting user email from jwt
     const token = localStorage.getItem("token")
     const decodedToken = decodeToken(token)

     //submitting form
     const submitForm = async (data) => {
           setLoading(true) 

           await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/supplements/add/${decodedToken.sub}`, data,
                        {
                            headers: {
                                "Content-Type" : "application/json" ,
                                Authorization : `Bearer ${token}`
                            }
                        }
                    ).then((res) =>{

                            res.status === 200 && toast.success("Produit ajouté au stock !")
                            setProductAdded(prevState => !prevState)
                            setLoading(false)
                    })
                    .catch((error) => {
                            toast.error("Une erreur est génerée ! Verifier votre internet")
                            setLoading(false)
                    })

     }


     
  return (
   
     <Offcanvas {...props} placement='end' scroll="true"  className="offCanvas offCanvas-end"> 
     <div className='compte-container'>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Ajouter des produits</Offcanvas.Title>
         </Offcanvas.Header>
         <Offcanvas.Body>
        <div className="form-container">

        <form onSubmit={handleSubmit(submitForm)}>

            {/*Selecting supplemets name*/}
    <div className='row'>
        <div className='col'>            
            <label for="listProduit" className='col-form-label' > Nom du produit:  </label>
             <select {...register('nom', {required: "Nom Requis"})} onChange={handleSelectedItem} className='form-select' id="listProduit">
                    <option key="key" selected> - Autre - </option>
                {
                    supplementsList.map((supp, index) => ( 
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }                
             </select>
             {errors.nom && <p className='text text-danger mt-2'>{errors.nom.message}</p>}
        </div>     

             {/*Selecting supplements type */}
        <div className='col'>            
            <label for="listTypeProduit" className='col-form-label'> Type du Produit:  </label>
             <select {...register('type', {required: "Type Requis"})} onChange={handleSelectedType} className='form-select' id="listTypeProduit">
                    <option key="key1" selected> - Autre - </option>
                {
                    
                    listItem === "Protéines" &&
                    proteinType.map((supp, index) => ( 
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }    
                {
                    listItem === "Gainer" &&
                    gainerType.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }
                {
                    listItem === "Vitamines" &&
                    vitamineType.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))
                } 
                {
                    listItem === "Créatine" &&
                    creatineType.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))
                } 
                {
                    listItem === "Pré-Workout" &&
                    preworkoutType.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }               
             </select>
             {errors.type && <p className='text text-danger mt-2'>{errors.type.message}</p>}
        </div>         
    </div>            
                {/*Selecting supplements brand to sale*/}
    <div className='row'>            
        <div className="col">
            <label for="marqueList" className='col-form-label'> Marque: </label>
                    
             <select {...register('marque', {required: "Marque Requise"})} defaultValue={"Marque du Produit"} className='form-select' id="marqueList">
             <option key="key2" selected>- Autre -</option>
                {
                      itemType !== "" &&
                      marque.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))  
                }
             </select>
             {errors.marque && <p className='text text-danger mt-2'>{errors.marque.message}</p>}
        </div>   
    
        <div className="col">
            <label for="quantite" className='col-form-label'> Quantité: </label>
             <input {...register("quantity", {required: "Quantité Requise"})}
                    type='number' 
                    className='form-control'
                    id="quantite"
                    placeholder="1" />
             {errors.quantity && <p className='text text-danger mt-2'>{errors.quantity.message}</p>}       
        </div>
    </div>      
    <div className='row'>            
        <div className="col">
            <label for="price" className='col-form-label'> Prix d'achat: </label>
             <input {...register("prixAchat", {required: "Prix Requis"})}
                    type='text' 
                    className='form-control'
                    id="price"
                    placeholder="770 Dh" />
              {errors.prixAchat && <p className='text text-danger mt-2'>{errors.prixAchat.message}</p>}             
        </div>
        <div className='col'>
            <label for="price" className='col-form-label'> Prix de vente: </label>
             <input {...register("prixVente", {required: "Prix requis"})}
                    type='text' 
                    className='form-control'
                    id="price"
                    placeholder="850 Dh" />
             {errors.prixVente && <p className='text text-danger mt-2'>{errors.prixVente.message}</p>}              
        </div>
    </div>
        <div className='submit-btn mt-4 mb-4'>
                 <button 
                        className='btn btn-outline-primary' 
                        style={{color: "white"}}
                        disabled={loading}>

                     {loading ? 
                             <div><Spinner animation="border" size="sm" as="span" /> <span> Loading...</span> </div>
                              : 'Ajouter Produit'
                              }
                 </button>
        </div>
        </form> 
        </div>       
        </Offcanvas.Body>     
     </div>        
     </Offcanvas>
  )
}

export default AddProducts