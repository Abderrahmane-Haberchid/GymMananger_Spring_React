import '../css/sales.css'
import React, { useContext, useEffect, useState } from 'react'
import AddSale from '../components/AddSale';
import { decodeToken } from 'react-jwt';
import toast from 'react-hot-toast';
import TableLoader from '../components/TableLoader'
import DataTable from 'react-data-table-component'        
import axios from 'axios'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import deleteIcon from '../img/deleteIcon.png'
import SharedState from '../context/MembreContext';
import ModalDeleteSale from '../modals/ModalDeleteSale';
import { Spinner } from 'react-bootstrap';

function Sales() {

  const { saleAdded, saleDeleted } = useContext(SharedState)
  const [loading, setLoading] = useState(false)

  // Modal Confirmation to delete sale, show, close
  const [showModal, setShowModal] = useState(false);
  const [sale, setSale] = useState({
    id: '', 
    nom: ''
  });

  const handleDeleteSale = (id, nom) => {
      setShowModal(true)
      setSale({
        id: id,
        nom: nom
      })
  }
  const handleCloseModal = () => setShowModal(false);

  // ===================================================

  const [showAddSaleForm, setShowAddSaleForm] = useState(false)
  const [sales, setSales] = useState([])
  const [pending, setPending] = useState(true)
  const [date, setDate] = useState(new Date())

  // Handling add products and Sale button
  const handleAddSale = () => {
      setShowAddSaleForm(true)
  }
  
// Getting the token ready to send 
  const token = localStorage.getItem("token")
  const decodedToken = decodeToken(token)


// Fetching sales data from db 
  const fetchSales = async () => {
    setLoading(true)
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/${decodedToken.sub}`, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      ).then(res => {
          setSales(res.data.saleSet.sort((a,b) => b.id - a.id))
          setLoading(false)
          setPending(false)
      })
      .catch(errors => {
          toast.error("Une erreur s'est produite")
          setLoading(false)
      })
}

  useEffect(() =>{
    fetchSales()
  }, [saleAdded, saleDeleted])

  // Filtering sales in table by selected date 

  const selectedMonth = date === null ? '' : date.getMonth()+1  
    const selectedYear = date === null ? '' : date.getFullYear()

  const filteredSales = sales.filter(sal => {
    return selectedMonth === '' ? sales : sal.dateVente.includes(selectedMonth+'-'+selectedYear)
  })

  {/*----------Datatable Property for Sales items-------------*/}
  const columnsSales = [
        
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
    },
    {
        name: '',
        selector: row => <img 
                            data-bs-toggle="modal" 
                            src={deleteIcon} 
                            style={{height: '22px', width: '22px', cursor: 'pointer'}}
                            onClick={() => handleDeleteSale(row.id, row.nom)}
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
            minWidth: '100%',
            maxHeight: '700px',
            overflow: 'scroll',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '20px',
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
            transition: 'var(--tran-03)',
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
  return (
    <div className='wrapper'>

    <div className='sale-div'>
            <button 
                className='btn btn-outline-success'
                onClick={handleAddSale}>

                <i class="fa-solid fa-plus md-3 fa-sm"></i>  Ajouter une Vente
            </button>
    </div>

    <div className='container-sales'>

      <div className='mesventes-container'>

      <p className='allsales-btn'>
        Mes Ventes({loading ? <Spinner animation='border' size='sm' /> : filteredSales.length})
      </p>
      
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
      </div>

      <div className='sales-table'>
     
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
                fixedHeader
                />          
      </div>
    
    
    </div>


    <AddSale display={showAddSaleForm} setDisplay={setShowAddSaleForm} />
    <ModalDeleteSale
            sale= {sale}
            show= {showModal}
            close= {handleCloseModal}
            setShow = {setShowModal}
        />
    </div>  

  )
  
}


export default Sales