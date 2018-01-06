import React from 'react';
import './Upcoming.css'

const Upcoming = ({eventId, eventName, eventDate, eventLocation, authorized, toggleEditEventForm, deleteEvent}) => (
    <div className="event">      
        <span className="event-detail">{eventName}</span>
        <span className="event-detail">{eventDate}</span>
        <span className="event-detail">{eventLocation}</span>
        <button disabled={!authorized} onClick={() => toggleEditEventForm(eventId)}>Edit</button>
        <button disabled={!authorized} onClick={() => deleteEvent(eventId)}>Delete</button>
    </div>
);

export default Upcoming;