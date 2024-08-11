import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import SharedState from '../context/MembreContext';
import { Spinner } from 'react-bootstrap';

function ModalActivateMembre(props) {

    const [disableBtn, setDisabledBtn] = useState(false)

    const { setMembreUpdated } = useContext(SharedState)

    const token = localStorage.getItem("token")

    const handleActivateMembre = () => {
      setDisabledBtn(true)
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/activate/${props?.membre?.email}`, 
            {
                headers: {
                    'Content-Type' : 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(res => {
            res.status === 200 && toast.success("Membre Activé !") 
            setMembreUpdated(prevState => !prevState)
            setDisabledBtn(false)
            props?.setShowModalActivation(false)
        })
        .catch(err => {
            err?.response?.status && toast.error("Une erreur s'est produite ! " + err?.response?.status) 
            setDisabledBtn(false)
        })
    }
  return (
    <>

      <Modal {...props} onHide={props?.close}>
        <Modal.Header closeButton>
          <Modal.Title>Activer le membre : {props?.membre?.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vous êtes sûr de vouloir activer ce compte ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props?.close} style={{background: 'gray'}}>
            Fermer
          </Button>
          <Button 
              variant="primary" 
              onClick={handleActivateMembre}
              disabled={disableBtn}
              >
            {disableBtn ? 
                <div> <Spinner animation="border" size="sm" as="span" /> <span>Loading...</span> </div> 
                : 'Activer'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalActivateMembre;