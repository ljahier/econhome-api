const express = require('express');
const bodyParser = require('body-parser');
const port = 8080 | process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes/index')(app);

app.listen(port, () => console.log("Server running on localhost:%s", port));
