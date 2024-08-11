import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import SharedState from '../context/MembreContext';
import { decodeToken } from 'react-jwt';
import Spinner from 'react-bootstrap/Spinner';

function ModalDeleteMembre(props) {

    const { setMembreDeleted } = useContext(SharedState)
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('token')

    const handleDeleteMembre = () => {
        setLoading(true)
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/user/delete/${props?.membre?.email}`, 
            {
                headers: {
                    'Content-Type' : 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(res => {
            res.status === 200 && toast.success("Membre Supprimé !") 
            setMembreDeleted(prevState => !prevState)
            props?.setShow(false)
            setLoading(false)
        })
        .catch(err => {
            toast.error("Une erreur s'est produite ! " + err?.response?.status) 
        })
    }
  return (
    <>

      <Modal {...props} onHide={props?.close}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer : {props?.membre?.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vous êtes sûr de vouloir supprimer le membre {props?.membre.nom} ?</Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={props?.close}
            style={{background: 'gray'}}
            >
            Fermer
          </Button>
          <Button 
                
                onClick={handleDeleteMembre}
                disabled={loading}>
            {loading ? 
                <div><Spinner animation="border" size='sm' as="span" /> <span>Loading...</span></div>
                : 'Supprimer'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteMembre;