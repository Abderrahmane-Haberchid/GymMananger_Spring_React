import '../css/supplements.css'
import protein from '../img/protein.png'
import vitamine from '../img/vitamine.png'
import React, { useContext, useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct';
import { decodeToken } from 'react-jwt';
import toast from 'react-hot-toast';
import TableLoader from '../components/TableLoader'
import DataTable from 'react-data-table-component'        
import axios from 'axios'
import SharedState from '../context/MembreContext';
import deleteIcon from '../img/deleteIcon.png'

function Supplements() {

  const {productAdded} = useContext(SharedState)

  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [supps, setSupps] = useState([])
  const [filter, setFilter] = useState('')
  const [pending, setPending] = useState(true)

  let proteineCount, gainerCount, vitamineCount, creatineCount

  // Handling add products button

  const handleAddProduct = () => {
    setShowAddProductForm(true)
}
  
// Getting the token ready to send 
  const token = localStorage.getItem("token")
  const decodedToken = decodeToken(token)

  // Fetching products from db
  const fetchSupp = async () => {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/${decodedToken.sub}`, 
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }
          }
        ).then(res => {
            setSupps(res.data.suppSet.sort((a,b) => b.id - a.id))
            
            setPending(false)
        })
        .catch(errors => {
            toast.error("Une erreur s'est produite")
        })
  }
// Counting how many item we got for each type of supps
proteineCount = supps.filter((sup) => {
  return sup.nom.includes("Protéines")
})  
gainerCount = supps.filter((sup) => {
  return sup.nom.includes("Gainer")
}) 
creatineCount = supps.filter((sup) => {
  return sup.nom.includes("Créatine")
}) 
vitamineCount = supps.filter((sup) => {
  return sup.nom.includes("Vitamine")
}) 


  useEffect(() =>{
    fetchSupp()
  }, [productAdded])

  // Filtering products in table depending on user's selection Proteine, Vitamine, Gainer or Creatine
  const filteredProducts = 

    supps.filter((sup) => {
      return filter === "" ? sup : sup.nom.includes(filter) 
    })

  {/*----------Datatable Property for products items-------------*/}
  const columns = [
        
    {
        name: "Nom",
        selector: row => row.nom,    
        sortable: true,
        width: "100px"
    },
    {            
        name: "Marque",
        selector: row => row.marque,
        sortable: true,
        width: "120px"
    },
    {
        name: "Type",
        selector: row => row.type,
        sortable: true,
        width: "120px"
    },
    {            
        name: "Prix Achat",
        selector: row => row.prixAchat,
        sortable: true,
        width: "120px"
    },
    {            
        name: "Prix Vente",
        selector: row => row.prixVente,
        sortable: true,                                                                                                         
        width: "170px"
    },
    {            
        name: "Qte",
        selector: row => row.quantity,
        sortable: true,
        width: "80px"
    },
    {            
        name: "Ajouté le",
        selector: row => row.dateAjout,
        sortable: true,
        width: "120px"
    },
    {
      name: '',
      selector: row => <img 
                          data-bs-toggle="modal" 
                          src={deleteIcon} 
                          style={{height: '22px', width: '22px', cursor: 'pointer'}}
                          onClick={() => {}}
                        />,
    }
    
]


const paginationComponentOptions = {
    rowsPerPageText: 'Ligne par page',
    rangeSeparatorText: 'sur',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Tous',
}
const customStyles = {

    tableWrapper: {
        style: {
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '15px',
            left: '0px',
            backgroundColor: 'var(--sidebar-color)',
        },
    },  
    table: {
        style:{
            margin: '20px',
            marginLeft: '30px',
            fontSize: '16px'
        }            
    },
      
    
    headRow: {
        style: {
            height: '40px',
            backgroundColor: 'var(--sidebar-color)',
            color: 'var(--text-color)',
            fontSize: '13px',
            transition: 'var(--tran-03)'
        }
    },
    rows: {
        style: {
            height: '40px',
            backgroundColor: 'var(--sidebar-color)',
            color: 'var(--text-color)',
            fontSize: '12px',
            transition: 'var(--tran-03)',
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
// Handling menu items selection Proteine, vitamine, gainer, creatine and setting the background
const proteinDiv = document.querySelector('.protein');
const gainerDiv = document.querySelector('.gainer');
const vitamineDiv = document.querySelector('.vitamine');
const creatineDiv = document.querySelector('.creatine');

const setPrteineSelection = () => {
  setFilter('Protéines')

  // hiding sale table whenever i click the menu items
  productTable.style.display = "block"
    showProductsBtn.style.textDecoration = 'none'

  proteinDiv.style.backgroundColor = 'var(--primary-color)'
  proteinDiv.style.color = 'white'

  gainerDiv.style.backgroundColor = 'var(--sidebar-color)'
  gainerDiv.style.color = 'var(--text-color)'

  vitamineDiv.style.backgroundColor = 'var(--sidebar-color)'
  vitamineDiv.style.color = 'var(--text-color)'

  creatineDiv.style.backgroundColor = 'var(--sidebar-color)'
  creatineDiv.style.color = 'var(--text-color)'
}
const setGainerSelection = () => {
  setFilter('Gainer')

  // hiding sale table whenever i click the menu items
  productTable.style.display = "block"
    showProductsBtn.style.textDecoration = 'none'

  proteinDiv.style.backgroundColor = 'var(--sidebar-color)'
  proteinDiv.style.color = 'var(--text-color)'

  gainerDiv.style.backgroundColor = 'var(--primary-color)'
  gainerDiv.style.color = 'white'

  vitamineDiv.style.backgroundColor = 'var(--sidebar-color)'
  vitamineDiv.style.color = 'var(--text-color)'

  creatineDiv.style.backgroundColor = 'var(--sidebar-color)'
  creatineDiv.style.color = 'var(--text-color)'
}

const setVitamineSelection = () => {
  setFilter('Vitamine')

  // hiding sale table whenever i click the menu items
  productTable.style.display = "block"
    showProductsBtn.style.textDecoration = 'none'

  proteinDiv.style.backgroundColor = 'var(--sidebar-color)'
  proteinDiv.style.color = 'var(--text-color)'

  gainerDiv.style.backgroundColor = 'var(--sidebar-color)'
  gainerDiv.style.color = 'var(--text-color)'

  vitamineDiv.style.backgroundColor = 'var(--primary-color)'
  vitamineDiv.style.color = 'white'

  creatineDiv.style.backgroundColor = 'var(--sidebar-color)'
  creatineDiv.style.color = 'var(--text-color)'
}

const setCreatineSelection = () => {
  setFilter('Créatine')

  // hiding sale table whenever i click the menu items
  productTable.style.display = "block"
    showProductsBtn.style.textDecoration = 'none'

  proteinDiv.style.backgroundColor = 'var(--sidebar-color)'
  proteinDiv.style.color = 'var(--text-color)'

  gainerDiv.style.backgroundColor = 'var(--sidebar-color)'
  gainerDiv.style.color = 'var(--text-color)'

  vitamineDiv.style.backgroundColor = 'var(--sidebar-color)'
  vitamineDiv.style.color = 'var(--text-color)'

  creatineDiv.style.backgroundColor = 'var(--primary-color)'
  creatineDiv.style.color = 'white'
}
//Showing products table and sales table depending on whats user choose

const productTable = document.querySelector(".products-table");
const showProductsBtn = document.querySelector('.allproduct-btn');

const setProductsTable = () => {
    setFilter('')  
    proteinDiv.style.backgroundColor = 'var(--sidebar-color)'
  proteinDiv.style.color = 'var(--text-color)'

  gainerDiv.style.backgroundColor = 'var(--sidebar-color)'
  gainerDiv.style.color = 'var(--text-color)'

  vitamineDiv.style.backgroundColor = 'var(--sidebar-color)'
  vitamineDiv.style.color = 'var(--text-color)'

  creatineDiv.style.backgroundColor = 'var(--sidebar-color)'
  creatineDiv.style.color = 'var(--text-color)'

    productTable.style.display = "block"
    showProductsBtn.style.textDecoration = 'underline'
} 


  return (
    <div className='wrapperS'>

    <div className='sup-div'>
            <button className='btn btn-outline-primary' onClick={handleAddProduct}>
                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Ajouter Produit
            </button>
    </div>
    <div className='container-item'>

      <div className="titleContainer">
        <p className='allproduct-btn'>Mes produits par catégorie</p>
      </div>
    
      <div className="container-products">
        <ul>
          <li>
            <div className='protein' onClick={setPrteineSelection}>
                <div>
                  <img src={protein} className='prot' />
                </div>
                <div>
                  <h6>Protéines</h6>
                  <h6>{proteineCount.length}</h6>
                </div>
          
            </div>
          </li>
      
          <li>
            <div className='vitamine' onClick={setVitamineSelection}>
                  <div>
                      <img src={vitamine} className='prot' />
                    </div>
                    <div>
                    <h6>Vitamine</h6>
                      <h6>{vitamineCount.length}</h6>
                    </div>
            </div>  
          </li>
          <li>
            <div className='gainer' onClick={setGainerSelection}>
                  <div>
                    <img src={protein} className='prot' />
                  </div>
                  <div>
                  <h6>Gainer</h6>
                  <h6>{gainerCount.length}</h6>
                  </div>
            </div>
          </li>
          <li>
            <div className='creatine' onClick={setCreatineSelection}>
                <div>
                  <img src={protein} className='prot' />
                </div>
                <div>
                <h6>Créatine</h6>
                <h6>{creatineCount.length}</h6>
                </div>
            </div>
          </li>
        </ul>
      
      </div>
      </div>

      <div className='products-table'>

      <div className='show-menu'>
      <p className='allproduct-btn' onClick={setProductsTable}>Tous mes Produits({supps.length})</p>
      </div>
      
      <DataTable                   
                columns={columns} 
                data={filteredProducts}
                progressPending={pending}
                progressComponent={<TableLoader />}
                customStyles={customStyles}                
                paginationComponentOptions={paginationComponentOptions}
                pagination
                responsive
                highlightOnHover
                Clicked
                />
      </div>
    <AddProduct display={showAddProductForm} setDisplay={setShowAddProductForm} />
    

    </div>  

    
  )
  
}


export default Supplements