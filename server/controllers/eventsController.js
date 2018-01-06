let events = [
    {
       "id":2,
       "name":"Queen Creek Feastival",
       "date":"01/5/18",
       "location":"Queen Creek Library"
    },
    {
       "id":3,
       "name":"Gilbert Feastival",
       "date":"01/13/18",
       "location":"Gilbert & Houston"
    }
 ];
let id = 0;

module.exports = {
    create: (req,res) => {
        const { name, date, location } = req.body;
        events.push({ id, name, date, location })
        id++
        res.status(201).send(events)
    },
    read: (req, res) => {
        res.status(200).send(events);
    },
    update: (req, res) => {
        const updateID = req.params.id;
        let indexOfEvent = events.findIndex(event => event.id == updateID);

        events[indexOfEvent] = {
            id: events[indexOfEvent].id,
            name: req.body.name || events[indexOfEvent].name,
            date: req.body.date || events[indexOfEvent].date,
            location: req.body.location || events[indexOfEvent].location
        };
        res.status(200).send(events);
    },
    delete: (req, res) => {
        const deleteID = req.params.id;
        let indexOfEvent = events.findIndex(event => event.id == deleteID);
        events.splice(indexOfEvent, 1)
        res.status(200).send(events);
    }
}