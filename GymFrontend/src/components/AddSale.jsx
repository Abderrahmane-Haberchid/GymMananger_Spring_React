
import { React, useContext } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { decodeToken } from 'react-jwt'
import '../css/supplements.css';
import SharedState from '../context/MembreContext'

function AddSale(props) {

    const { setSaleAdded } = useContext(SharedState)

    const [listItem, setListItem] = useState("")
    const [itemType, setItemType] = useState("")
    const [loading, setLoading] = useState(false)

    const supplementsList = ["Proteines", "Gainer", "Vitamines", "Créatine", "Pré-Workout"]
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


     const closeForm = () =>{
        props.setDisplay(false)
     }

     const handleSelectedItem = (e) => {
        setListItem(e.target.value)
     }
     const handleSelectedType = (e) => {
        setItemType(e.target.value)
     }

     const token = localStorage.getItem("token")
     const decoded = decodeToken(token)

     const onSubmit = async (dataset) =>{
        setLoading(true)
           await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/sale/add/${decoded.sub}`, dataset,
                         {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization : `Bearer ${token}`
                            }
                        }
                        )
                        .then(response => {
                        response.status === 200 && toast.success("Vente Validée !") 
                        setSaleAdded(prevState => !prevState)    
                        setLoading(false)
                       })             
                       .catch(err => {
                            toast.error("Une erreur s'est produite") 
                       })

        }

  return (
   
     <Offcanvas show={props.display} onHide={closeForm} placement='end' scroll="true" backdrop="true" className="offCanvas"> 
     <div className='compte-container'>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title>Valider une vente</Offcanvas.Title>
         </Offcanvas.Header>
        <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>

            {/*Selecting supplements to sale*/}
    <div className='row'>
        <div className='col mb-3'>            
            <label htmlFor="listProduit" className='mb-2'> Nom du Produit:  </label>
             <select {...register('nom', {required: "Nom Requis"})}onChange={handleSelectedItem} className='form-select' id="listProduit">
                    <option key="key1" selected> - Autre - </option>
                {
                    supplementsList.map((supp, index) => ( 
                        <option key={index} value={supp}>{supp}</option>
                    ))
                }                
             </select>
             {errors.nom && <p className='text text-danger mt-2'>{errors.nom.message}</p>}
        </div>     

             {/*Selecting supplements type to sale*/}
        <div className='col mb-3'>            
            <label htmlFor="listTypeProduit" className='mb-2'> Type de Produit:  </label>
             <select {...register('type', {required: "Type requis"})} onChange={handleSelectedType} className='form-select' id="listTypeProduit">
             <option key="key1" selected> - Autre - </option>
                {
                    listItem === "Proteines" &&
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
                    listItem === "Creatine" &&
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
    <div className='row'>            
                {/*Selecting supplements brand to sale*/}

        <div className="col mb-3">
            <label htmlFor="marqueList" className='mb-2'> Marque: </label>
             <select {...register('marque', {required: "Marque Requise"})} className='form-select' id="marqueList">
             <option key="key1" selected> - Autre - </option>
                {
                      itemType !== "" &&
                      marque.map((supp, index) => (
                        <option key={index} value={supp}>{supp}</option>
                    ))  
                }
             </select>
             {errors.marque && <p className='text text-danger mt-2'>{errors.marque.message}</p>}
        </div>     
        <div className="col mb-3">
            <label htmlFor="quantite" className='mb-2'> Quantité: </label>
             <input {...register("quantity", {required: "Quantité Requise"})}
                    type='number' 
                    className='form-control'
                    id="quantite"
                    placeholder='0' />
            {errors.quantity && <p className='text text-danger mt-2'>{errors.quantity.message}</p>}      
        </div>
    </div>
    <div className='row'>
        <div className="col mb-3">
            <label htmlFor="price" className='col-form-label mb-2'> Prix de vente unitaire: </label>
             <input {...register("prixVente", {required: "Prix Requis"})}
                    type='text' 
                    className='form-control'
                    id="price"
                    placeholder="999 Dh" />
            {errors.prixVente && <p className='text text-danger mt-2'>{errors.prixVente.message}</p>}        
        </div>
    </div>
        <div className='col mb-3'>
                 <button className='btn btn-success valide-sale-btn'>
                    {loading ? '... Loading' : 'Valider ma vente'}
                </button>
        </div>
    
        </form> 
        </div>       
           
     </div>        
     </Offcanvas>
  )
}

export default AddSale