// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Link, useParams, useHistory } from 'react-router-dom';
import EventList from '../Events/EventList';
import './Home.css';

function Home() {
  return (
    <div className='full-screen home'>
      <div className='home-header' />
      <div className='container'>
        <div className='home-text'>
          <h1 className='home-title'>Campaignr Community</h1>
          <h2 className='home-description'>An <b>organization</b> for the like minded</h2>
          <h3 className='home-welcome'>Join our next <b>event!</b></h3>
        </div>
        <EventList home={true} />
      </div>
    </div>
  );
};

export default Home;
