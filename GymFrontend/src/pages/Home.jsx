
import React from 'react';
import UserCard from '../components/UserCard';


function Home(props) {
  
  return (
    <>

    <UserCard searchtxt={props.searchtxt} />
    </>
  )
}

export default Home