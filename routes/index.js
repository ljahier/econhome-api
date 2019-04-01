module.exports = (app, ejs, fs, mysql, crypto) => {

    connection = mysql.createConnection({
        host: process.env.MYSQL_ADDON_HOST,
        user: process.env.MYSQL_ADDON_USER,
        database: process.env.MYSQL_ADDON_DB,
        password: process.env.MYSQL_ADDON_PASSWORD,
        port: process.env.MYSQL_ADDON_PORT
    });


    app.get('/', (req, res) => {
        connection.query(
            'SELECT * FROM `data`',
            function (err, results) {
                res.json(results)
            }
        );
    })

    app.get('/water/:data', (req, res) => {
        let sensorData = { sensor: `water`, data: `${req.params.data}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.redirect(200, '/');
        });
    })

    app.get('/water', (req, res) => {
        res.send('Pouet');
    })

    app.get('/temperature/:data', (req, res) => {
        let sensorData = { sensor: `temperature`, data: `${req.params.data}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.redirect(200, '/');
        });
    })

    app.get('/temperature', (req, res) => {
        res.send('Pouet');
    })

    app.get('/lightning/:data', (req, res) => {
        let sensorData = { sensor: `lightning`, data: `${req.params.data}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.redirect(200, '/');
        });
    })
    app.get('/lightning', (req, res) => {
        res.send('Pouet');
    })
}