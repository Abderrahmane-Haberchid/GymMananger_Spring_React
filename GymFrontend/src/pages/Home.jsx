import '../css/home.css'
import React, { useEffect } from 'react';
import UserCard from '../components/UserCard';


function Home(props) {
  
  return (
    <>

    <UserCard searchtxt={props.searchtxt} />
    </>
  )
}

export default Home