import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from './components/Home'
import { EventList, EventPage, CreateEventPage, EditEventPage } from './components/Events'
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
          <Route path="/" >
            <Home />
          </Route>
          <Route path="/events">
            <EventList />
          </Route>
          <Route path="/events/new">
            <CreateEventPage />
          </Route>
          <Route path="/events/:eventId">
            <EventPage />
          </Route>
          <Route path="/events/:eventId/edit">
            <EditEventPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
