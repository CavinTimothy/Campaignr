import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from './components/Home'
import EventList from './components/Events/EventList';
import EventPage from "./components/Events/EventPage";
import CreateEventPage from "./components/Events/CreateEventPage";
import EditEventPage from "./components/Events/EditEventPage";
import { authenticate } from "./store/session";
import { fetchEvents } from "./store/events";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/events">
            <EventList />
          </Route>
          <Route path="/events/new">
            <CreateEventPage />
          </Route>
          <Route exact path="/events/:eventId">
            <EventPage />
          </Route>
          <Route path="/events/:eventId/edit">
            <EditEventPage />
          </Route>
        </Switch>
      )}
      <div className='footer'>
        <a href='https://www.linkedin.com/in/cavin-timothy//'>Linkedin</a>
        &nbsp;|&nbsp;
        <a href='https://github.com/CavinTimothy'>Github</a>
      </div>

    </>
  );
}

export default App;
