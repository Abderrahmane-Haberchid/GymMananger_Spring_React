import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import SharedState from '../context/MembreContext';
import { decodeToken } from 'react-jwt';
import { Spinner } from 'react-bootstrap';

function ModalDeleteSale(props) {

    const [disableBtn, setDisabledBtn] = useState(false)
    const { setSaleDeleted } = useContext(SharedState)
    const token = localStorage.getItem('token')

    const userEmail = decodeToken(token)

    const handleDeleteSale = () => {
      setDisabledBtn(true)
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/sale/delete/${props?.sale?.id}/${userEmail.sub}`, 
            {
                headers: {
                    'Content-Type' : 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(res => {
            res.status === 200 && toast.success("Sale Supprimé !") 
            setSaleDeleted(prevState => !prevState)
            setDisabledBtn(false)
            props?.setShow(false)
        })
        .catch(err => {
            toast.error("Une erreur s'est produite ! " + err?.response?.status) 
        })
    }
  return (
    <>

      <Modal {...props} onHide={props?.close}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer vente : {props?.sale?.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vous êtes sûr de vouloir supprimer cette vente ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props?.close}>
            Fermer
          </Button>
          <Button 
              variant="danger" 
              onClick={handleDeleteSale}
              disabled={disableBtn}
              >
            {disableBtn ? 
                <div> <Spinner animation="border" size="sm" as="span" /> <span>Loading...</span> </div> 
                : 'Supprimer'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteSale;