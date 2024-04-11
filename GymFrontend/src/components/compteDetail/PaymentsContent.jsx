import React, { useEffect, useState } from 'react'
import './payment.css'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import LoaderTablePayments from '../LoaderTablePayments'
import deleteIcon from './deleteIcon.png'
import ModalConfirmation from './ModalConfirmation'


function PaymentsContent(props) {

    const token = localStorage.getItem('token')

    const [payment, setPayment] = useState([])
    const [pending, setPending] = useState(true);
    const [paymentId, setPaymentId] = useState(0)

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    
    // Handling the show action and getting payments ID to delete
    const handleShow = (id) => {
        setShowModal(true)
        setPaymentId(id)
    }

    const id = props.membreId


    const fetchdata = async () =>{
        await axios.get(`http://localhost:8081/api/v1/membres/id/${id}`,
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
      }

    useEffect(() => {            
       fetchdata()        
    }, [])
    
    
    const columns = [
        {
            name: "Prix",
            selector: row => row.prix + " DH",
            sortable: true,
            width: "80px"
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
                                onClick={() => handleShow(row.id)}
                                 />,
            width: "60px"
        },
    ]

    const customStyles = {
      table: {
          style:{
              backgroundColor: 'var(--sidebar-color)'
          }            
      },
      responsiveWrapper: {
          style: {},
      },
      headRow: {
          style: {
              backgroundColor: 'var(--sidebar-color)',
              color: 'var(--text-color)',
              fontWeight: 'bold',
              fontSize: '12px',
              transition: 'var(--tran-03)',
              
          }
      },
      rows: {
          style: {
              backgroundColor: 'var(--sidebar-color)',
              color: 'var(--text-color)',
              fontSize: '11px',
              transition: 'var(--tran-03)',
              
          }
      }
      
  }

  return (

    <div className='payments-table'>

        <ModalConfirmation 
                    show={showModal} 
                    onHide={handleClose} 
                    handleClose={handleClose} 
                    paymentId={paymentId}
             /> 
        <center>    
       
        <DataTable
         fixedHeader    
         columns={columns} 
         data={payment}
         progressPending={pending}
         progressComponent={<LoaderTablePayments />}
         fixedHeaderScrollHeight="350px"   
         customStyles={customStyles} 
        />
        
       </center>  
    </div>
  )
}

export default PaymentsContent