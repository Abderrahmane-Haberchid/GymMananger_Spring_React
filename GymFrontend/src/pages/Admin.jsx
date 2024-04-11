import { decodeToken } from 'react-jwt'
import '../css/user.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import watsapp from '../img/watsapp.webp'
import { Link } from 'react-router-dom'

function Admin(){

    const [ user, setUser] = useState([])

    const token = localStorage.getItem('token')
    const decodedToken = decodeToken(token)

    const {
        register,
        handleSubmit
    } = useForm()

    const fetchUser = async () => {

       await axios.get(`http://localhost:8081/api/v1/user/${decodedToken.sub}`, 
                    {
                        headers: {
                               'Content-Type': 'Application/json',
                               Authorization: `Bearer ${token}` 
                        }
                    })
                    .then(res => {
                            
                        setUser(res.data)
                    })
                    .catch(error =>{
                        error?.response?.status !== 200 && toast.error('Une erreur de connexion est produite !')
                    })
    } 

        useEffect(() => {
            fetchUser()
        }, [])            

        let creationDate = user.created_at 
        const day = creationDate?.slice(0,2)
        const month = creationDate?.slice(3,5) 
        const expMonth = parseInt(month) + 3
        const year = creationDate?.slice(6,11)

       const date = day + "-" + expMonth + "-" + year

    return(
        <div className='wrapper-admin'>
            <div className='title'>
                <h3>Welcome {user.username} !</h3>
            </div>  
            <div className='centent'>
                <form>
                <div className="form-contol row">
                    <label for="username" className="form-label">
                        Username
                    </label>
                    <input {...register('username')}
                           className="form-control" 
                           id="username"  
                           value={user.username}
                           disabled
                           />
                </div>
                <div className="form row">
                    <label for="username" className="form-label">
                        Email 
                    </label>
                    <input {...register('email')}
                           className="form-control" 
                           id="username"  
                           value={user.email}
                           disabled
                           />
                </div>
                <div className="form row">
                    <label for="username" className="form-label">
                        Created at:
                    </label>
                    <input {...register('created_at')}
                           className="form-control" 
                           id="username"  
                           value={user.created_at}
                           disabled
                           />
                </div>

                <div className="form row">
                    <label for="username" className="form-label" style={{color: "rgba(242, 38, 19, 0.9)", fontSize: "18px", marginTop:"20px"}}>
                        Fin periode d'essai:
                    </label>
                    <input {...register('created_at')}
                           className="form-control" 
                           style={{background: "rgba(242, 38, 19, 0.9)", color: "white", fontSize: "17px"}}
                           id="username"  
                           value={date}
                           disabled
                           />
                </div>

                </form>
            </div >
            <div className='contactIcon'>
            <Link to='https://wa.me/+212674980418' className='link-help'> 
            <p className='help-text'>Besoin d'assistance ?</p>
            <img src={watsapp} style={{width: "70px", height: "70px"}} />
            </Link>
            </div>
        </div>
    )
}
export default Admin 