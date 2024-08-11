import React, { useEffect, useState } from 'react'
import '../css/statis.css'
import { Chart as Chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, LineElement,
    PointElement } from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';
import { decodeToken } from 'react-jwt';
import LoaderTablePayments from '../components/loaders/LoaderTablePayments'
import axios from 'axios'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';


Chartjs.register( 
    BarElement,
    CategoryScale,  
    LinearScale, 
    Tooltip, 
    Legend,
    ArcElement,
    LineElement,
    PointElement
)

function Statis() {

    const [payments, setPayments] = useState([])
    const [membre, setMembre] = useState([])
    const [date, setDate] = useState(new Date())

    const [sales, setSales] = useState([])

    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)

    // Getting total payments by month for first chart 
    const filteredPayments01 = payments.filter((p) => {
        return p.date_paiement.includes('01-2024')
    })
    let totalMonth01 = 0
    filteredPayments01.map(value => {
        totalMonth01 += value.prix
    })

    const filteredPayments02 = payments.filter((p) => {
        return p.date_paiement.includes('02-2024')
    })
    let totalMonth02 = 0
    filteredPayments02.map((value) => {
        totalMonth02 += value.prix
    })

    const filteredPayments03 = payments.filter((p) => {
        return p.date_paiement.includes('03-2024')
    })
    let totalMonth03 = 0
    filteredPayments03.map(value => {
        totalMonth03 += value.prix
    })

    const filteredPayments04 = payments.filter((p) => {
        return p.date_paiement.includes('04-2024')
    })
    let totalMonth04 = 0
    filteredPayments04.map(value => {
        totalMonth04 += value.prix
    })

    const filteredPayments05 = payments.filter((p) => {
        return p.date_paiement.includes('05-2024')
    })
    let totalMonth05 = 0
    filteredPayments05.map(value => {
        totalMonth05 += value.prix
    })

    const filteredPayments06 = payments.filter((p) => {
        return p.date_paiement.includes('06-2024')
    })
    let totalMonth06 = 0
    filteredPayments06.map(value => {
        totalMonth06 += value.prix
    })

    const filteredPayments07 = payments.filter((p) => {
        return p.date_paiement.includes('07-2024')
    })
    let totalMonth07 = 0
    filteredPayments07.map(value => {
        totalMonth07 += value.prix
    })

    const filteredPayments08 = payments.filter((p) => {
        return p.date_paiement.includes('08-2024')
    })
    let totalMonth08 = 0
    filteredPayments08.map(value => {
        totalMonth08 += value.prix
    })

    const filteredPayments09 = payments.filter((p) => {
        return p.date_paiement.includes('09-2024')
    })
    let totalMonth09 = 0
    filteredPayments09.map(value => {
        totalMonth09 += value.prix
    })

    const filteredPayments10 = payments.filter((p) => {
        return p.date_paiement.includes('10-2024')
    })
    let totalMonth10 = 0
    filteredPayments10.map(value => {
        totalMonth10 += value.prix
    })

    const filteredPayments11 = payments.filter((p) => {
        return p.date_paiement.includes('11-2024')
    })
    let totalMonth11 = 0
    filteredPayments11.map(value => {
        totalMonth11 += value.prix
    })

    const filteredPayments12 = payments.filter((p) => {
        return p.date_paiement.includes('12-2024')
    })
    let totalMonth12 = 0
    filteredPayments12.map(value => {
        totalMonth12 += value.prix
    })

    // Getting sales per month for first chart

    const filteredSale01 = sales.filter((s) => {
        return s.dateVente.includes('01-2024')
    })
    let totalSale01 = 0
    filteredSale01.map(value => {
        totalSale01 += value.prixVente
    })

    const filteredSale02 = sales.filter((s) => {
        return s.dateVente.includes('02-2024')
    })
    let totalSale02 = 0
    filteredSale02.map(value => {
        totalSale02 += value.prixVente
    })
    
    const filteredSale03 = sales.filter((s) => {
        return s.dateVente.includes('03-2024')
    })
    let totalSale03 = 0
    filteredSale03.map(value => {
        totalSale03 += value.prixVente
    })

    const filteredSale04 = sales.filter((s) => {
        return s.dateVente.includes('04-2024')
    })
    let totalSale04 = 0
    filteredSale04.map(value => {
        totalSale04 += value.prixVente
    })

    const filteredSale05 = sales.filter((s) => {
        return s.dateVente.includes('05-2024')
    })
    let totalSale05 = 0
    filteredSale05.map(value => {
        totalSale05 += value.prixVente
    })

    const filteredSale06 = sales.filter((s) => {
        return s.dateVente.includes('06-2024')
    })
    let totalSale06 = 0
    filteredSale06.map(value => {
        totalSale06 += value.prixVente
    })

    const filteredSale07 = sales.filter((s) => {
        return s.dateVente.includes('07-2024')
    })
    let totalSale07 = 0
    filteredSale07.map(value => {
        totalSale07 += value.prixVente
    })

    const filteredSale08 = sales.filter((s) => {
        return s.dateVente.includes('08-2024')
    })
    let totalSale08 = 0
    filteredSale08.map(value => {
        totalSale08 += value.prixVente
    })

    const filteredSale09 = sales.filter((s) => {
        return s.dateVente.includes('09-2024')
    })
    let totalSale09 = 0
    filteredSale09.map(value => {
        totalSale09 += value.prixVente
    })

    const filteredSale10 = sales.filter((s) => {
        return s.dateVente.includes('10-2024')
    })
    let totalSale10 = 0
    filteredSale10.map(value => {
        totalSale10 += value.prixVente
    })

    const filteredSale11 = sales.filter((s) => {
        return s.dateVente.includes('11-2024')
    })
    let totalSale11 = 0
    filteredSale11.map(value => {
        totalSale11 += value.prixVente
    })

    const filteredSale12 = sales.filter((s) => {
        return s.dateVente.includes('12-2024')
    })
    let totalSale12 = 0
    filteredSale12.map(value => {
        totalSale12 += value.prixVente
    })

    // ------------------------------------------------------------

    // Global situation data for last chart

    const global01 = totalMonth01 + totalSale01
    const global02 = totalMonth02 + totalSale02
    const global03 = totalMonth03 + totalSale03
    const global04 = totalMonth04 + totalSale04
    const global05 = totalMonth05 + totalSale05
    const global06 = totalMonth06 + totalSale06
    const global07 = totalMonth07 + totalSale07
    const global08 = totalMonth08 + totalSale08
    const global09 = totalMonth09 + totalSale09
    const global10 = totalMonth10 + totalSale10
    const global11 = totalMonth11 + totalSale11
    const global12 = totalMonth12 + totalSale12

    // Paid and Unpaid membre for the chart 

    const paidCount = membre.filter(m => {
        return m.statut.includes('Paid')
    })
    const unPaidCount = membre.filter(m => {
        return m.statut.includes('Unpaid')
    })

    // New subscurption per month for 3rd chart

    const newMembre01 = membre.filter(m => {
        return m.dateInscription.includes('01-2024')
    })

    const newMembre02 = membre.filter(m => {
        return m.dateInscription.includes('02-2024')
    })

    const newMembre03 = membre.filter(m => {
        return m.dateInscription.includes('03-2024')
    })

    const newMembre04 = membre.filter(m => {
        return m.dateInscription.includes('04-2024')
    })

    const newMembre05 = membre.filter(m => {
        return m.dateInscription.includes('05-2024')
    })

    const newMembre06 = membre.filter(m => {
        return m.dateInscription.includes('06-2024')
    })

    const newMembre07 = membre.filter(m => {
        return m.dateInscription.includes('07-2024')
    })

    const newMembre08 = membre.filter(m => {
        return m.dateInscription.includes('08-2024')
    })

    const newMembre09 = membre.filter(m => {
        return m.dateInscription.includes('09-2024')
    })

    const newMembre10 = membre.filter(m => {
        return m.dateInscription.includes('10-2024')
    })

    const newMembre11 = membre.filter(m => {
        return m.dateInscription.includes('11-2024')
    })

    const newMembre12 = membre.filter(m => {
        return m.dateInscription.includes('12-2024')
    })
    // All chart data are here
    
    const data1 = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets:[{
            label: 'Etat des souscriptions',
            data: [newMembre01.length, newMembre02.length, newMembre03.length, newMembre04.length, newMembre05.length,
                newMembre06.length, newMembre07.length, newMembre08.length, newMembre09.length, newMembre10.length, 
                newMembre11.length, newMembre12.length],
            borderColor: 'black',
            backgroundColor: ['#2193b0'],
            borderWidth: 1,
            
        }]
    }
    const options = {
        responsive: true,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
        }
           
}
    const data2 = {
        labels: ['Payés', 'Impayés'],
        datasets:[{
            label: 'nombre: ',
            data: [paidCount.length, unPaidCount.length],
            borderColor: 'black',
            backgroundColor: ['#2193b0', 'rgba(255, 0, 0, 0.8)'],
            borderWidth: 1,
            
        }
    ]
    }
   

    const data4 = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets:[{
            label: 'Paiements Abonnement en DH',
            data: [totalMonth01, totalMonth02, totalMonth03, totalMonth04, totalMonth05, totalMonth06, totalMonth07, totalMonth08
                , totalMonth09, totalMonth10, totalMonth11, totalMonth12],
            borderColor: 'black',
            backgroundColor: ['#2193b0'],
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 12
            
        },
        {
            label: 'Vente Suppléments en DH',
            data: [totalSale01, totalSale02, totalSale03, totalSale04, totalSale05, totalSale06, totalSale07, totalSale08
                , totalSale09, totalSale10, totalSale11, totalSale12],
            borderColor: 'black',
            backgroundColor: ['#753a88'],
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 12
            
        }
    ]

    }

    const data6 = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets:[{
            label: 'Total Gains en DH',
            data: [global01, global02, global03, global04, global05, global06, global07, global08, global09, global10,
                global11, global12],
            borderColor: 'black',
            backgroundColor: ['#2193b0'],
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
            
        }]
    }
    // ======= End of Data chart ==========

    // Fetching payments from DB

    const token = localStorage.getItem("token")

    const decodedToken = decodeToken(token)

    const fetchPayments = async () => {
          setLoading(true)
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/${decodedToken.sub}`, 
                   { 
                    headers: {
                        "Content-Type": "Application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                        setPayments(res.data.paiementsSet.sort((a,b) => b.id - a.id))
                        setMembre(res.data.membreSet)
                        setSales(res.data.saleSet)
                        setPending(false)
                        setLoading(false)
                })
                .catch( err => {
                    toast.error('Une erreur de connexion survient! Réessayer plus tard')
                    setLoading(false)
                })
    }

    useEffect(() =>{
        fetchPayments()
    }, [])
   
    const UnpaidMembre = membre.filter(m => {
        return m.statut.includes('Unpaid')
    })

    // Counting Membre and Payments added this month 
    
    const today = new Date()
    const month = today.getMonth()+1 
    const year = today.getFullYear()

    const membreAddedThisMonth = membre.filter((m) => {
            return m.dateInscription.includes(month+'-'+year)
    })

    const paymentThisMonth = payments.filter((p) => {
     
        return p.date_paiement.includes(month+'-'+year)
    })

    // Filtering payments by selected months

    const selectedMonth = date === null ? '' : date.getMonth()+1  
    const selectedYear = date === null ? '' : date.getFullYear()
    
    const filteredPayments = payments.filter((p) => {
        return selectedMonth === '' ? payments : p.date_paiement.includes(selectedMonth+'-'+selectedYear)
    })
    // Payments history table's column

    const columns = [
        {
            name: "Prix",
            selector: row => row.prix + "dh",
            sortable: true,
            width: "100px"
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
        }
        
    ]

    // Styling data table

    const customStyles = {
        tableWrapper:{
            style:{
                zIndex: '0'
            }
        },
        table: {
            style:{
                background: 'var(--sidebar-color)',
                scrollbarColor: "var(--primary-dark-color)",
                minHeight: '360px'
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
                fontSize: '14px',
                transition: 'var(--tran-03)',
            }
        },
        rows: {
            style: {
                backgroundColor: 'var(--sidebar-color)',
                color: 'var(--text-color)',
                fontSize: '14px',
                transition: 'var(--tran-03)'
            }
        },
        
        
    }

    // Calculating payments total for all membres
    let total = 0
    filteredPayments.map((value) => {
        total += value.prix
    })

  return (
    
<div className="statis-container">
    <div className='header-container'>
        <div className='membre-card'>
        <i className="fa-solid fa-user fa-2xl"></i>
        <h4><b> {loading ? <Spinner animation='border' /> : membre.length}</b></h4>
            
           <p>Membres au total</p> 
        </div>
        <div className='ajoutecemois-card'> 
        <i className="fa-solid fa-circle-plus fa-2xl"></i>
            <h4><b>{loading ? <Spinner animation='border' /> : membreAddedThisMonth.length}</b></h4>
            <p>Ajoutés ce Mois</p>
        </div>
        <div className='payment-card'> 
        <i className="fa-solid fa-sack-dollar fa-2xl"></i>
            <h4><b>{loading ? <Spinner animation='border' /> : paymentThisMonth.length}</b></h4>
            <p>Payments ce Mois</p>
        </div>
        <div className='desactive-card'>
        <i className="fa-solid fa-ban fa-2xl"></i>
            <h4><b>{loading ? <Spinner animation='border' /> : UnpaidMembre.length}</b></h4> 
            <p>Membres Impayés</p>
        </div>

    </div>


    <div className='body-container'>  

        <div className='money-monthly'>  
          <p>Situation Financiére:</p>
            <Line data={data4} options={options} width={680} height={400} className='chart1' />
        </div>

        
        <div className='payments-history'>
        <p id='payments-history-p'>Historique des paiements ({loading ? <Spinner animation='border' size='sm' /> : filteredPayments.length })</p> 
        <div className='history-wrapper'>
        <p id='totalPayment'>Total: {loading ? <Spinner animation='border' size='sm' /> : total} DH </p>
        
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
        <DataTable
         fixedHeader    
         columns={columns} 
         data={filteredPayments}
         progressPending={pending}
         progressComponent={<LoaderTablePayments />}
         fixedHeaderScrollHeight="360px"   
         className='datatable'
         highlightOnHover
         customStyles={customStyles} 
        />
        </div>

        <div className='added-member-monthly'> 
        <p>Etat des nouvelles Inscriptions:</p> 
            <Bar data={data1} options={options} height={400} width={300} />
        </div>

        <div className='added-payments-monthly'>
        <p>Etat de paiement des membres:</p>
            <Pie data={data2} options={options} />
        </div>

        <div className='total-money-monthly'>
        <p>Situation Financiére Globale:</p>
            <Line data={data6} options={options} height={400} width={300} className='chart2' />
        </div>
    </div>
</div>
  
  )
}

export default Statis