import '../css/supplements.css'
import protein from '../img/protein.png'
import vitamine from '../img/vitamine.png'
import React, { useEffect, useState } from 'react'
import AddSale from '../components/AddSale';
import AddProduct from '../components/AddProduct';
import { decodeToken } from 'react-jwt';
import toast from 'react-hot-toast';
import TableLoader from '../components/TableLoader'
import DataTable from 'react-data-table-component'        
import axios from 'axios'
import ReactDatePicker, { DatePicker } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

function Supplements() {

  const [showAddSaleForm, setShowAddSaleForm] = useState(false)
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [supps, setSupps] = useState([])
  const [sales, setSales] = useState([])
  const [filter, setFilter] = useState('')
  const [pending, setPending] = useState(true)
  const [date, setDate] = useState(new Date())

  let proteineCount, gainerCount, vitamineCount, creatineCount

  // Handling add products and Sale button
  const handleAddSale = () => {
      setShowAddSaleForm(true)
  }
  const handleAddProduct = () => {
    setShowAddProductForm(true)
}
  
// Getting the token ready to send 
  const token = localStorage.getItem("token")
  const decodedToken = decodeToken(token)

  // Fetching products from db
  const fetchSupp = async () => {
      await axios.get(`http://localhost:8081/api/v1/user/${decodedToken.sub}`, 
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
// Fetching sales data from db 
  const fetchSales = async () => {
    await axios.get(`http://localhost:8081/api/v1/user/${decodedToken.sub}`, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      ).then(res => {
          setSales(res.data.saleSet.sort((a,b) => b.id - a.id))
          
          setPending(false)
      })
      .catch(errors => {
          toast.error("Une erreur s'est produite")
      })
}

  useEffect(() =>{
    fetchSupp()
    fetchSales()
  }, [])

  // Filtering products in table depending on user's selection Proteine, Vitamine, Gainer or Creatine
  const filteredProducts = 

    supps.filter((sup) => {
      return filter === "" ? sup : sup.nom.includes(filter) 
    })
  // Filtering sales in table by selected date 

  const selectedMonth = date === null ? '' : date.getMonth()+1  
    const selectedYear = date === null ? '' : date.getFullYear()

  const filteredSales = sales.filter(sal => {
    return selectedMonth === '' ? sales : sal.dateVente.includes(selectedMonth+'-'+selectedYear)
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
    }
    
]

  {/*----------Datatable Property for Sales items-------------*/}
  const columnsSales = [
        
    {
        name: "Nom",
        selector: row => row.nom,    
        sortable: true,
        width: "80px"
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
        name: "Prix Vente",
        selector: row => row.prixVente,
        sortable: true,
        width: "120px"
    },
    {            
        name: "Qte",
        selector: row => row.quantity,
        sortable: true,
        width: "100px"
    },
    {            
        name: "Fait le",
        selector: row => row.dateVente,
        sortable: true,
        width: "100px"
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
            width: '8ß0%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '20px',
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
    salesTable.style.display = "none"
    showProductsBtn.style.textDecoration = 'none'
    showSalesBtn.style.textDecoration = 'none'

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
    salesTable.style.display = "none"
    showProductsBtn.style.textDecoration = 'none'
    showSalesBtn.style.textDecoration = 'none'

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
    salesTable.style.display = "none"
    showProductsBtn.style.textDecoration = 'none'
    showSalesBtn.style.textDecoration = 'none'

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
    salesTable.style.display = "none"
    showProductsBtn.style.textDecoration = 'none'
    showSalesBtn.style.textDecoration = 'none'

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
const salesTable = document.querySelector('.sales-table');
const showProductsBtn = document.querySelector('.allproduct-btn');
const showSalesBtn = document.querySelector('.allsales-btn');

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
    salesTable.style.display = "none"
    showProductsBtn.style.textDecoration = 'underline'
    showSalesBtn.style.textDecoration = 'none'
} 

const setSalesTable = () => {

  setFilter('')  
    proteinDiv.style.backgroundColor = 'var(--sidebar-color)'
  proteinDiv.style.color = 'var(--text-color)'

  gainerDiv.style.backgroundColor = 'var(--sidebar-color)'
  gainerDiv.style.color = 'var(--text-color)'

  vitamineDiv.style.backgroundColor = 'var(--sidebar-color)'
  vitamineDiv.style.color = 'var(--text-color)'

  creatineDiv.style.backgroundColor = 'var(--sidebar-color)'
  creatineDiv.style.color = 'var(--text-color)'
      
  productTable.style.display = "none"
  salesTable.style.display = "block"
  showProductsBtn.style.textDecoration = 'none'
  showSalesBtn.style.textDecoration = 'underline'  
}


  return (
    <div className='wrapper'>

    <div className='sale-div'>
            <button className='btn btn-outline-success' onClick={handleAddSale}>
                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Valider Vente
            </button>
            <button className='btn btn-outline-primary' onClick={handleAddProduct}>
                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Ajouter Produit
            </button>
       </div>
    <div className='container-items'>

      <div className='protein' onClick={setPrteineSelection}>
        <div>
          <img src={protein} className='prot' />
        </div>
        <div>
          <h6>Protéines</h6>
          <h6>{proteineCount.length}</h6>
        </div>
        
      </div>
      <div className='gainer' onClick={setGainerSelection}>
      <div>
          <img src={protein} className='prot' />
        </div>
        <div>
        <h6>Gainer</h6>
        <h6>{gainerCount.length}</h6>
        </div>
      </div>
      <div className='vitamine' onClick={setVitamineSelection}>
      <div>
          <img src={vitamine} className='prot' />
        </div>
        <div>
        <h6>Vitamine</h6>
          <h6>{vitamineCount.length}</h6>
        </div>
      </div>
      <div className='creatine' onClick={setCreatineSelection}>
      <div>
          <img src={protein} className='prot' />
        </div>
        <div>
        <h6>Créatine</h6>
        <h6>{creatineCount.length}</h6>
        </div>
      </div>

      <div className='show-menu'>
      <p className='allproduct-btn' onClick={setProductsTable}>Tous les Produits({supps.length})</p>
      <p className='allsales-btn' onClick={setSalesTable}>Historique des Ventes({filteredSales.length})</p>
      </div>

      <div className='products-table'>
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
      
      <div className='sales-table'>
      <ReactDatePicker
                showIcon
                selected={date}
                onChange={date => setDate(date)}
                dateFormat={'MM-yyyy'}
                showMonthYearPicker
                isClearable={true}
                className="datePicker"
                wrapperClassName='wrapperClass'
            />
      <DataTable                   
                columns={columnsSales} 
                data={filteredSales}
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
    
    <AddSale display={showAddSaleForm} setDisplay={setShowAddSaleForm} />
    <AddProduct display={showAddProductForm} setDisplay={setShowAddProductForm} />
    </div>

    </div>  

    
  )
  
}


export default Supplements