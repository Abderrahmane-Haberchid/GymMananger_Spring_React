import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import "../css/login.css";
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ModalForgetPassword from '../modals/ModalForgetPassword';

export default function Login() {

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const [first, setFirst] = useState(true)
    const [seconde, setSeconde] = useState(false)
    const [third, setThird] = useState(false)
    const [fourth, setFourth] = useState(false)
    const [fifth, setFifth] = useState(false)
    const [sixth, setSixth] = useState(false)
    const [seventh, setSeventh] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmitLogin = (dataLogin) => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, 
              dataLogin,
              {
                headers: 
                {'content-Type': 'application/json'}
              }
              )
          .then(response => {

                      if(response.status === 200){
                        toast.success("Bienvenue au tableau de bord !")
                        localStorage.setItem("token", response.data.token)
                        setTimeout(() => {
                          window.location.reload()
                          setLoading(false)  
                        }, 1000)
                        
                      } 
                      
                    
          })
          .catch(errors => {
            errors.response.status === 403 ? toast.error("Login or Password incorrect !") : toast.error("An error has occured ! "+ errors.response.status) 
            setLoading(false)  
          })
}

  return (
    
    <div className="login-container">

   
        <div className="login-form-container">
            <form onSubmit={handleSubmit(onSubmitLogin)}>
                <h3>Connectez-vous</h3>

                <input type="text"
                        {...register("email")}
                      placeholder="Email" />
                <input type="password" 
                      {...register("password")} 
                      placeholder="Password" />
                <a href="#" onClick={() => setShow(true)}>Mot de passe oublié?</a>
                <button
                    disabled={loading}
                >
                  { loading ? 
                            <div> <Spinner animation="border" size="sm" as="span" /> <span>Loading...</span> </div> 
                            : 'Se connecter' }
                  </button>
                <br />      
                <p>Vous n'êtes pas encore inscrit ?</p>
                <Link to="/register" style={{textDecoration: 'underline', fontSize: '18px', fontWeight: '500'}}> Créez un compte</Link>
            </form>
        </div>

        <div className='login-services-container'>

              <div className='login-presentation-div'>
                <span onClick={() => setFirst(prevState => !prevState)}>

                  {first ? <i className="fa-sharp fa-solid fa-minus fa-xl"  style={{marginRight: '10px'}}></i>
                        : <i className="fa-regular fa-plus fa-xl" style={{marginRight: '10px'}}></i> }
                  C'est quoi <span style={{color: '#512da8', fontWeight: 'bold'}}>Gymer Pro</span> ?
                </span>
              {first &&
                <p>
                  Une plate-forme destinée au proprio des salles de sport, permettant d’avoir la main sur la gestion de leur porte 
                  feuille puis garder l’oeil sur l’évolution de leur projet… 
                </p>
                }
              </div>    

              <div className='login-service-presente-container'>
                <span onClick={() => setSeconde(prevState => !prevState)}>

                  {seconde ? <i className="fa-sharp fa-solid fa-minus fa-xl"  style={{marginRight: '10px'}}></i>
                        : <i className="fa-regular fa-plus fa-xl" style={{marginRight: '10px'}}></i> }
                  Quelles sont les services présentés ?    
                </span>

                {seconde &&
                  <>
                    <div className='login-sous-service-div'>
                      <span onClick={() => setFourth(prevState => !prevState)}>
                      {fourth ? <i className="fa-sharp fa-solid fa-minus fa-xl"  style={{marginRight: '10px'}}></i>
                        : <i className="fa-regular fa-plus fa-xl" style={{marginRight: '10px'}}></i> }
                        Gestion des membre:
                      </span>
                    {fourth && 
                      <p>
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Inscription des membre(Photo, Nom, prénom, adresse mail…) <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Attribuer un paiement au membres <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Détection automatique des membres en impayé <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Désactiver un membre en cas de besoin <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Filtrer ou Chercher un membre par nom dans quelque secondes <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Voir l’historique des paiements pour chaque membre <br />
                      </p>
                    }  
                    </div>

                    <div className='login-sous-service-div'>
                      <span onClick={() => setFifth(prevState => !prevState)}>
                      {fifth ? <i className="fa-sharp fa-solid fa-minus fa-xl"  style={{marginRight: '10px'}}></i>
                        : <i className="fa-regular fa-plus fa-xl" style={{marginRight: '10px'}}></i> }
                        Gestion des suppléments:
                      </span>
                      {fifth &&
                      <p>
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Ajouter des produits au stock(Type, Marque, Prix….) <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Lister les produits disponibles dependement de leur type <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Avoir une vue sur la quantité disponible de chaque type de supplement <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Suppression d’un supplements en cas de besoin <br />
                      </p>
                      }
                    </div>

                    <div className='login-sous-service-div'>
                      <span onClick={() => setSixth(prevState => !prevState)}>
                      {sixth ? <i className="fa-sharp fa-solid fa-minus fa-xl"  style={{marginRight: '10px'}}></i>
                        : <i className="fa-regular fa-plus fa-xl" style={{marginRight: '10px'}}></i> }
                        Gestion des ventes:
                      </span>
                      {sixth &&  
                      <p>
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Ajouter une vente d’un supplement <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Supprimer une vente en cas d’erreur <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Lister toutes les ventes <br /> 
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Filter les ventes dépendaient des type de supplément vendu, prix, ou date de vente <br />
                      </p>
                      }
                    </div>

                    <div className='login-sous-service-div'>
                      <span onClick={() => setSeventh(prevState => !prevState)}>
                      {seventh ? <i className="fa-sharp fa-solid fa-minus fa-xl"  style={{marginRight: '10px'}}></i>
                        : <i className="fa-regular fa-plus fa-xl" style={{marginRight: '10px'}}></i> }
                        Analytique:
                      </span>
                      {seventh &&  
                      <p>
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Accéder a une analytique precise sous forme des graphes simples à lire <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Suivre de près votre état financier <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Consulter les paiements effectués par jour/mois <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Voir l’état des membres payé/impayé <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Analyser vos revenues mensuels (ventes, paiements des membres) <br />
                      </p>
                      }  
                    </div>
                  </>  
                  }  
              </div>      

              <div className='login-enprofter-div'>
                      <span onClick={() => setThird(prevState => !prevState)}>

                      {third ? <i className="fa-sharp fa-solid fa-minus fa-xl"  style={{marginRight: '10px'}}></i>
                        : <i className="fa-regular fa-plus fa-xl" style={{marginRight: '10px'}}></i> }
                        Comment en profiter ?
                      </span>
                    {third && 
                      <p>
                      <i class="fa-sharp fa-solid fa-circle-check"></i> C'est très simple, commencez par créer un compte ! C'est gratuit et sans engagement<br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Par défaut, une période d'essaie de 3 mois est offerte <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Familiarisez vous avec les fonctionnalités de Gymer Pro <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Au bout de 3mois, vous serez libre de choix, soit continuer ou bien annuler votre compte <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> A seulement 10 dollars par mois, vous pourrez continuer à utiliser Gymer Pro <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Paiement se fait par virement, contacez-nous via watsapp pour plus d'info <br />
                      <i class="fa-sharp fa-solid fa-circle-check"></i> Dans votre page Admin, appuyer sur l'icon Watsapp pour nous contacter <br />
                      </p>
                    }  
              </div>
          </div>
   <ModalForgetPassword show={show} setShow={setShow} />
</div>

  )
}