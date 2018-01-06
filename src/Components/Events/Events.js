import React, { Component } from 'react';
import Header from '../Header/Header';
import Upcoming from './Upcoming'
import './Events.css'
import axios from 'axios';

class Events extends Component {
    constructor() {
        super();
        this.state = {
            showAddEventForm: false,
            showEditEventForm: false,
            authorized: false,
            password: 'test',
            events: []
        }
        this.toggleAddEventForm = this.toggleAddEventForm.bind(this);
        this.toggleEditEventForm = this.toggleEditEventForm.bind(this);
        this.authorize = this.authorize.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        axios.get('/api/events')
        .then(res => this.setState({events: res.data}))
    }

    getEvents() {
        axios.get('/api/events')
        .then(res => this.setState({events: res.data}))
    }

    createEvent() {
        const newEvent = {
            name: this.refs.name.value,
            date: this.refs.date.value,
            location: this.refs.location.value
        }
        axios.post('/api/events', newEvent)
        .then(res => this.setState({events: res.data}));
    }

    updateEvent() {
        const newEvent = {
            name: this.refs.name.value,
            date: this.refs.date.value,
            location: this.refs.location.value
        }
        axios.put(`/api/events/${this.state.editId}`, newEvent)
        .then(res => this.setState({
            events: res.data,
            showEditEventForm: false
        }));
    }

    deleteEvent(id) {
        axios.delete(`/api/events/${id}`)
        .then(res => this.setState({
            events: res.data,
            showAddEventForm: false            
        }));
    }

    toggleEditEventForm(id) {
        this.setState({
            showEditEventForm: !this.state.showEditEventForm,
            editId: id
        })
    }

    toggleAddEventForm() {
        this.setState({
            showAddEventForm: !this.state.showAddEventForm
        })
    }

    authorize() {
        const password = this.refs.password.value;
        this.setState({
            authorized: password == this.state.password
        })
      }

    render() {
        const editEventForm = (
            <form action="#" onSubmit={this.updateEvent}>
                <input ref="name" placeholder="Event Name" />
                <input ref="date" placeholder="Event Date" />
                <input ref="location" placeholder="Event Location" />
                <input type="submit" />           
            </form>
        )
        const addEventForm = (
            <form action="#" onSubmit={this.createEvent}>
                <input ref="name" placeholder="Event Name" />
                <input ref="date" placeholder="Event Date" />
                <input ref="location" placeholder="Event Location" />
                <input type="submit" />           
            </form>
        )
        const login = (
            <form action="#" onSubmit={this.authorize}>
              <input ref="password" type="password" placeholder="Password" />
              <input type="submit" />
            </form>
        );
        let upcomingEvents = this.state.events.map((event, index) => {
            return (<Upcoming key={index} eventId={event.id} eventName={event.name} eventDate={event.date} eventLocation={event.location} authorized={this.state.authorized} toggleEditEventForm={this.toggleEditEventForm} deleteEvent={this.deleteEvent}/>)
        })

        return(
            <div>
                <Header title="Upcoming Events"/>
                <div className="event-component">
                    {!this.state.authorized ? login : ""}
                    {this.state.authorized ? (<button onClick={this.toggleAddEventForm}>{this.state.showAddEventForm ? '-' : '+'}</button>) : ""}
                    <div className="event-headers">
                        <span className="event-header"><strong>Name</strong></span>
                        <span className="event-header"><strong>Date</strong></span>
                        <span className="event-header"><strong>Location</strong></span>
                    </div>
                    <div>{upcomingEvents}</div>
                    {this.state.showAddEventForm ? addEventForm : ""}
                    {this.state.showEditEventForm ? editEventForm : ""}
                </div>
            </div>
        )
    }
}

export default Events