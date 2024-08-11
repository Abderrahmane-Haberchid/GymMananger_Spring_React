import '../css/membres.css'

import { useState, useEffect, React, useContext } from 'react'
import DataTable from 'react-data-table-component'        
import axios from 'axios'
import TableLoader from '../components/loaders/TableLoader'
import avatar from '../img/avatar.jpg'
import CompteModal from '../components/compteDetail/CompteModal'
import AddMembreForm from '../components/AddMembreForm'
import toast from 'react-hot-toast'
import { decodeToken } from "react-jwt";
import SharedState from '../context/MembreContext'
import { Button, Spinner } from 'react-bootstrap'

function Membres() {    

    const { membreAdded, membreUpdated, membreDeleted } = useContext(SharedState)

    const [rows, setRows] = useState([])
    const [pending, setPending] = useState(true)

    const [search, setSearch] = useState("")
    const [stateFilter, setStateFilter] = useState("")
    const [loading, setLoading] = useState(false)

    // Display Compte Details
    const [idmembre, setIdMembre] = useState()
    const [showCompte, setShowCompte] = useState(false)

    const handleShow = (filteredData) => {
        setIdMembre(filteredData.id_membre)
        setShowCompte(true)
    }     
    const handleClose = () => {setShowCompte(false)}

    

    {/*--------Affichage des Membres dans table-------------*/}

    const fetchdata = async () =>{
        setLoading(true)
        const token = localStorage.getItem("token")

        const config = {
            headers:{
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`,
            }
        }

        const decoded = decodeToken(token)

        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/${decoded.sub}`, config)
                    .then(res =>{
                        setRows(res.data.membreSet.sort((a, b) => b.id_membre - a.id_membre))  
                        setPending(false)
                        setLoading(false)
                    })
                    .catch((errors) => {
                        errors?.response?.status  === 403 && toast.error("Pease log in again !")  
                        setLoading(false)
                      } 
                    )
      }     
      {/*--------Handling filtering search-------------*/}

      let filteredData = ""

        if(search !== ""){
            filteredData = rows.filter((users) => {
            return users.nom.toLowerCase().includes(search) || users.prenom.toLowerCase().includes(search) 
        })
        }   

        if(stateFilter !== ""){
            filteredData = rows.filter((users) => {
            return users.statut.toLowerCase().includes(stateFilter)
            })
        }   

    useEffect(() => {           
       fetchdata() 
    }, [membreAdded, membreUpdated, membreDeleted])

    
    {/*----------displaying add Form ------------*/}  

      const [addForm, setAddForm] = useState(false)
      const handleAddForm = () => setAddForm(true)
    

    {/*----------Datatable Property-------------*/}
    const columns = [
        
        {
            name: "",
            selector: row => <img src={row.image !== "" ? `https://gympics.s3.eu-north-1.amazonaws.com/${row.image}` : avatar} 
                                alt="profile" 
                                style={{width:"35px", height:"35px", backgroundImage:"cover", marginTop: "15px"}} 
                                className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                            />,    
            sortable: true,
            width: "80px"
        },
        {            
            name: "Nom",
            selector: row => row.nom,
            sortable: true,
            width: "120px"
        },
        {
            name: "Prénom",
            selector: row => row.prenom,
            sortable: true,
            width: "140px"
        },
        {            
            name: "Ajouté le",
            selector: row => row.dateInscription,
            sortable: true,
            width: "120px"
        },
        {            
            name: "Tel",
            selector: row => row.telephone,
            sortable: true,                                                                                                         
            width: "140px"
        },
        {            
            name: "Age",
            selector: row => row.age,
            sortable: true,
            width: "100px"
        },
        {            
            name: "Statut",
            selector: row => row.statut,
            sortable: true,
            width: "100px"
        },
        {            
            name: "Etat",
            selector: row => row.state,
            sortable: true,
            width: "100px"
        }
        
    ]

    const paginationComponentOptions = {
        rowsPerPageText: 'Ligne par page',
        rangeSeparatorText: 'sur',
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Tous',
    }
    const customStyles = {

        tableWrapper: {
            style: {
                maxWidth: '100%',
                maxHeight: '700px',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '20px',
                backgroundColor: 'var(--sidebar-color)',
                overflow: 'scroll',
                zIndex: '0'
            },
        },  
        table: {
            style:{
                margin: '20px',
                marginLeft: '30px',
                fontSize: '16px',
                cursor: 'hand',
                maxWidth: '100%',
                backgroundColor: 'var(--sidebar-color)',
            }            
        },
          
        
        headRow: {
            style: {
                height: '40px',
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                fontSize: '16px',
                transition: 'var(--tran-03)',
                width: '100%',
            }
        },
        rows: {
            style: {
                height: '40px',
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                fontSize: '15px',
                transition: 'var(--tran-03)',
                cursor: 'pointer',
                maxWidth: '100%',
            },
            stripedStyle: {
                backgroundColor: 'var(--body-color)',
                color: 'var(--text-color)',
            },
        },
        pagination:{
            style: {
                backgroundColor: 'transparent',
                color: 'var(--text-color)',
                fontSize: '16px',
                marginRight: '10%',
                transition: 'var(--tran-03)'
            }    
        }
        
    }

    const conditionalRowStyles = [

        {
            when: row => row.statut === "Paid",
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                maxWidth: '100%'
            },
        },
        
        {
            when: row => row.statut === "Unpaid",
            style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        }
    ]
    const dataFinal = filteredData !== "" ? filteredData : rows
    
  return (
    <div className='membre-wrapper'>

    {/*******Texte search input for fitrer**********/}
    <div className='search-container'>

          <div className="membreCounter-container"> 
          <p className='membreCounter-text'>{loading ? <Spinner animation='border' size='sm' /> : dataFinal.length} Membres</p>
          <br />
          </div>
          
          <div className='search-input-container'>
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input type='text' 
                   className='search-input' 
                   placeholder='Chercher par Nom' 
                   onChange={(e) => setSearch(e.target.value.toLowerCase()) } />
          </div>  

    </div>

    {/*-----------Table des Membres--------*/}
    

    {/*******Bouton d'ajout d'un nouveau Membre**********/}
      <div className='table-header'> 
       <div className='add-btn'>
            <Button 
                 type='submit'
                 onClick={handleAddForm}>
                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Ajouter Membre
            </Button>
       </div>

    {/*******Liste de filtrage Payé/Impayé**********/}       
       <div className='sorting-option'>
            <span>Trier par</span>  
            <select className='sorting-list' onChange={(e) => setStateFilter(e.target.value.toLowerCase()) }>   
                <option value='' selected>Tous</option>
                <option value='Paid'>Payés</option>
                <option value='Unpaid'>Impayés</option>
            </select>
       </div>
         
        <DataTable                   
                columns={columns} 
                data={dataFinal}
                progressPending={pending}
                progressComponent={<TableLoader />}
                customStyles={customStyles}                
                paginationComponentOptions={paginationComponentOptions}
                pagination
                responsive
                highlightOnHover
                onRowClicked={handleShow}
                conditionalRowStyles={conditionalRowStyles}
                fixedHeader
                />

    <AddMembreForm display={addForm} setDisplay={setAddForm} />

    <CompteModal idmembre={idmembre} show={showCompte} onHide={handleClose} />
    
    </div> 
    </div>
  )
}

export default Membres