import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import SharedState from '../context/MembreContext';
import { decodeToken } from 'react-jwt';

function ModalDeleteProduct(props) {

    const { setProductDeleted } = useContext(SharedState)
    const token = localStorage.getItem('token')

    const userEmail = decodeToken(token)

    const handleDeleteProduct = () => {

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
          <Button variant="secondary" onClick={props?.close}>
            Fermer
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteProduct;