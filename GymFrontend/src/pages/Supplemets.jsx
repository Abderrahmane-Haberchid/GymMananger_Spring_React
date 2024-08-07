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
import ModalDeleteProduct from '../modals/ModalDeleteProduct';
import { Spinner } from 'react-bootstrap';

function Supplements() {

  const {productAdded, productDeleted} = useContext(SharedState)

  const [loading, setLoading] = useState(false)

  // Modal Confirmation to delete product, show, close
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    id: '', 
    nom: ''
  });

  const handleDeleteProduct = (id, product) => {
      setShowModal(true)
      setProduct({
        id: id,
        nom: product
      })
  }
  const handleCloseModal = () => setShowModal(false);

  // ===================================================

  const [supps, setSupps] = useState([])
  const [filter, setFilter] = useState('')
  const [pending, setPending] = useState(true)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
// Getting the token ready to send 
  const token = localStorage.getItem("token")
  const decodedToken = decodeToken(token)

  // Fetching products from db
  const fetchSupp = async () => {
    setLoading(true)
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/${decodedToken.sub}`, 
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }
          }
        ).then(res => {
            setSupps(res.data.suppSet.sort((a,b) => b.id - a.id))
            setLoading(false)
            setPending(false)
        })
        .catch(errors => {
            toast.error("Une erreur s'est produite")
            setLoading(false)
        })
  }


      // Counting how many item we got for each type of supps
      const proteineCount = supps.filter((sup) => {
        return sup.nom.includes("Protéines")
      })  
      const gainerCount = supps.filter((sup) => {
        return sup.nom.includes("Gainer")
      }) 
      const creatineCount = supps.filter((sup) => {
        return sup.nom.includes("Créatine")
      }) 
      const vitamineCount = supps.filter((sup) => {
        return sup.nom.includes("Vitamine")
      }) 


  useEffect(() =>{
    fetchSupp()
  }, [productAdded, productDeleted])

  // Filtering products in table depending on user's selection Proteine, Vitamine, Gainer or Creatine
  const filteredProducts = 

    supps.filter((sup) => {
      return filter === "" ? sup : sup.nom.includes(filter) 
    })

  {/*----------Datatable Property for products items-------------*/}
  const columns = [
        
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
        width: "68px"
    },
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
                          onClick={() => {handleDeleteProduct(row.id, row.nom)}}
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
            maxWidth: '100%',
            maxHeight: '700px',
            overflow: 'scroll',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '15px',
            backgroundColor: 'var(--sidebar-color)',
            zIndex: '0'
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
            fontSize: '16px',
            transition: 'var(--tran-03)'
        }
    },
    rows: {
        style: {
            height: '40px',
            backgroundColor: 'var(--sidebar-color)',
            color: 'var(--text-color)',
            fontSize: '15px',
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
            <button className='btn btn-outline-primary' onClick={handleShow}>
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
                  <h6><b>{loading ? <Spinner animation='border' size='sm' /> : proteineCount.length}</b></h6>
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
                      <h6><b>{loading ? <Spinner animation='border' size='sm' /> : vitamineCount.length}</b></h6>
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
                  <h6><b>{loading ? <Spinner animation='border' size='sm' /> : gainerCount.length}</b></h6>
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
                <h6><b>{loading ? <Spinner animation='border' size='sm' /> : creatineCount.length}</b></h6>
                </div>
            </div>
          </li>
        </ul>
      
      </div>
      </div>

      <div className='products-table'>

      <div className='show-menu'>
      <p className='allproduct-btn' onClick={setProductsTable}>Mes produits({loading ? <Spinner animation='border' size='sm' /> : supps.length})</p>
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
                fixedHeader
                />
      </div>
    <AddProduct show={show} onHide={handleClose} />
    
    <ModalDeleteProduct
        product= {product}
        show= {showModal}
        close= {handleCloseModal}
        setShow = {setShowModal}
    />
    </div>  

    
  )
  
}


export default Supplements