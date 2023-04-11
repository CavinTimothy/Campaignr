import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams, useHistory } from 'react-router-dom';
import EventList from '../Events/EventList';
import './Home.css';

function Home() {
  return (
    <div className='full-screen home'>
      <div className='container'>
        <div className='home-text'>
          <h2 className='home-welcome'>Welcome to the </h2>
          <h1 className='home-title'>Campaignr</h1>
          <div className='home-description'>
            a new way to socially share the brew you're currently enjoying, as
            well as where you're enjoying it, with your friends!{' '}
          </div>
        </div>
        <EventList />
      </div>
    </div>
  );
};

export default Home;
