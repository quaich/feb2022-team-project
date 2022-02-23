const express = require ('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello world! How are you?");
});

// route 

app.get('/api/product/:id', (req, res) => {
    res.send(req.params.id);
});

app.get('/api/product/:year/:day', (req, res) => {
    res.send(req.params);
});
app.listen(3000, () => console.log("Listening port 3000...!"));

