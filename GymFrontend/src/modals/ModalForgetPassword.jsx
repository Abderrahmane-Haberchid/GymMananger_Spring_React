import axios from 'axios';
import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function ModalForgetPassword(props) {

    const [disableBtn, setDisabledBtn] = useState(false)
    const handleClose = () => props?.setShow(false)
    const {
        register,
        handleSubmit
    } = useForm()

    const sendEmail = (data) => {
      setDisabledBtn(true)
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/validateEmail`, data,
            {
                headers: {
                    'Content-Type' : 'Application/json'
                }
            }
        ).then(res => {
            res.status === 200 && toast.success("Un email vous a été envoyé !") 
            setDisabledBtn(false)
            props?.setShow(false)
        })
        .catch(err => {
            toast.error("Une erreur s'est produite ! "+ data.email + err?.response?.status) 
            setDisabledBtn(false)
        })
    }
  return (
    <>

      <Modal {...props} onHide={handleClose}>
      <form onSubmit={handleSubmit(sendEmail)}>
        <Modal.Header closeButton>
          <Modal.Title>Réinitialiser mot de passe {props?.sale?.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Veuillez saisir votre adresse email ici: <br />

        
            <input type='email' {...register('email')} placeholder="Adresse email..." className='form-control' />
        

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{background:'gray'}}>
            Fermer
          </Button>
          <Button 
              type='submit'
              variant="primary" 
              disabled={disableBtn}
              >
            {disableBtn ? 
                <div> <Spinner animation="border" size="sm" as="span" /> <span>Loading...</span> </div> 
                : 'Envoyer'}
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalForgetPassword;