
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast'

function ModalConfirmation(props) {

        const token = localStorage.getItem('token')

        // Delete payment
        const deletePayment = async () => {
            await axios.delete(`http://localhost:8081/api/v1/payments/delete/${props.paymentId}`, 
                {
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }    
            ).then((res) =>{
                    res?.status === "200" && toast.success("Paiement Supprimé !")
            })
            .catch((error) =>
                error?.response && toast.error("Une erreur "+error?.response.status+" est survenue, merci de réessayer !")
            )
        }

    const customStyle = {
        up:{
            background: 'var(--sidebar-color)', 
            color:'var(--text-color)', 
            borderTopRightRadius:'5px', 
            borderTopLeftRadius:'5px'
        },
        bottom:{
            background: 'var(--sidebar-color)', 
            color:'var(--text-color)', 
            borderBottomRightRadius:'5px', 
            borderBottomLeftRadius:'5px'
        }
        
    }
    console.log(props.show + "     handleClose:"+props.handleClose+"     Payment ID:"+ props.paymentId)

  return (
    <>

      <Modal 
            show={props.show}
            onHide={props.handleClose}
            animation={true} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
        <Modal.Header closeButton style={customStyle.up}>
          <Modal.Title>Confirmation !</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: 'var(--sidebar-color)', color:'var(--text-color)'}}>
            Etes vous sûr de vouloir supprimer ce paiement ?
            </Modal.Body>
        <Modal.Footer style={customStyle.bottom}>
          <Button variant="secondary" onClick={props.handleClose}>
            Non
          </Button>
          <Button variant="danger" onClick={deletePayment}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirmation;