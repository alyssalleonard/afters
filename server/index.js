const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const baseURL = '/api'
const port = process.env.PORT || 3001;
const eventsController = require('./controllers/eventsController');
const token = 'nZ4FY_tXHnFkQF6SOUiSKG_ybJjuj8MkwV0coJ-0xIF3crDul8k8pbBrwPrcDn8W-SM74V0uAXZX-ilfzi_nJdNJJ8FtrecaMgk1AqK6mepUD1aYb24sF5941Lf3WXYx';
app.use(bodyParser.json());

app.use(express.static( __dirname + '/../public/build'));
app.post(`${baseURL}/events`, eventsController.create);
app.get(`${baseURL}/events`, eventsController.read);
app.put(`${baseURL}/events/:id`, eventsController.update);
app.delete(`${baseURL}/events/:id`, eventsController.delete);
app.get(`${baseURL}/reviews`, (req, res) => {
    axios.get('https://api.yelp.com/v3/businesses/afters-gilbert/reviews', 
        { 
            headers: { 
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true
        }
    ).then(response => res.status(200).send(response.data.reviews))
})

app.listen(port, () => console.log(`The magic is happening on port ${port}`));