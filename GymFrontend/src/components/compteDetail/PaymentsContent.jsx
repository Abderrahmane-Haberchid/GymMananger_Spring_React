import React, { useContext, useEffect, useState } from 'react'
import '../../css/payment.css'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import LoaderTablePayments from '../loaders/LoaderTablePayments'
import deleteIcon from '../../img/deleteIcon.png'
import ModalDeletePayment from '../../modals/ModalDeletePayment'
import SharedState from '../../context/MembreContext'
import toast from 'react-hot-toast'


function PaymentsContent(props) {

    const {membreUpdated} = useContext(SharedState)

    const token = localStorage.getItem('token')

    const [payment, setPayment] = useState([])
    const [pending, setPending] = useState(true);
    const [paymentId, setPaymentId] = useState(0)

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    
    // Handling the show action and getting payments ID to delete
    const showPaymentDetails = (id) => {
        setShowModal(true)
        setPaymentId(id)
        console.log(showModal)
    }  

    const id = props.membreId


    const fetchdata = async () =>{
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/membres/id/${id}`,
                        {
                            headers: {
                                'Content-Type': 'Application/json',
                                'Authorization': `Bearer ${token}`,
                            }
                        }
                        )
                    .then(res =>{
                    setPayment(res.data.paiementsSet.sort((a, b) => b.id - a.id))
                    setPending(false)
                    })
                    .catch(err => {
                        toast.error("Une erreur de connexion est produite! Réessayer plus tard")
                        setPending(false)
                    })
      }

    useEffect(() => {            
       fetchdata()        
    }, [membreUpdated])
    
    const columns = [
        {
            name: "Prix",
            selector: row => row.prix + " DH",
            sortable: true,
            width: "auto"
        },
        {            
            name: "Date",
            selector: row => row.date_paiement,
            sortable: true,
        },
        {
            name: "Expiration",
            selector: row => row.date_expiration,
            sortable: true
        },
        {
            selector: row => <img 
                                data-bs-toggle="modal" 
                                src={deleteIcon} 
                                style={{height: '22px', width: '22px', cursor: 'pointer'}}
                                onClick={() => showPaymentDetails(row.id)}
                                 />,
            width: "60px"
        },
    ]

    const customStyles = {
        tableWrapper: {
            style: {
                maxWidth: '100%',
                maxHeight: '400px',
                marginLeft: '10px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'var(--sidebar-color)',
            },
        },   

      table: {
          style:{
              backgroundColor: 'var(--sidebar-color)',
              overflow: 'hidden'
          }            
      },
      responsiveWrapper: {
          style: {},
      },
      headRow: {
          style: {
              backgroundColor: 'var(--sidebar-color)',
              color: 'var(--text-color)',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'var(--tran-03)',
              
              
          }
      },
      rows: {
          style: {
              backgroundColor: 'var(--sidebar-color)',
              color: 'var(--text-color)',
              fontSize: '13px',
              transition: 'var(--tran-03)',
              cursor: 'pointer' ,
              overflow: 'hidden'
          }
      }
      
  }

  return (

    <div className='payments-table'>

        <ModalDeletePayment 
                    show={showModal} 
                    onHide={handleClose} 
                    handleClose={handleClose} 
                    paymentId={paymentId}
                    membreId={id}
             /> 
       
        <DataTable
         fixedHeader    
         columns={columns} 
         data={payment}
         progressPending={pending}
         progressComponent={<LoaderTablePayments />}
         customStyles={customStyles} 
         responsive
         highlightOnHover
        />
    </div>
  )
}

export default PaymentsContent