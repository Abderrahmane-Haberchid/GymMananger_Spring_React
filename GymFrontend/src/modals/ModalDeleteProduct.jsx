import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import SharedState from '../context/MembreContext';
import { decodeToken } from 'react-jwt';
import { Spinner } from 'react-bootstrap';

function ModalDeleteProduct(props) {
    
    const [disableBtn, setDisableBtn] = useState(false)

    const { setProductDeleted } = useContext(SharedState)
    const token = localStorage.getItem('token')

    const userEmail = decodeToken(token)

    const handleDeleteProduct = () => {
      setDisableBtn(true)
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/supplements/delete/${props?.product?.id}/${userEmail.sub}`, 
            {
                headers: {
                    'Content-Type' : 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(res => {
            res.status === 200 && toast.success("Produit Supprimé !") 
            setProductDeleted(prevState => !prevState)
            setDisableBtn(false)
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
          <Modal.Title>Supprimer produit : {props?.product?.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vous êtes sûr de vouloir supprimer ce produit ?</Modal.Body>
        <Modal.Footer>
          <Button 
             onClick={props?.close}
             style={{background: 'gray'}}>
            Fermer
          </Button>
          <Button 
              
              onClick={handleDeleteProduct}
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

export default ModalDeleteProduct;