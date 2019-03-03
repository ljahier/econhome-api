module.exports = (app, ejs, fs, mysql, crypto) => {
    // create the connection to database
    let config;
    let connection;
    let configFileError;

    try {
        fs.accessSync('./config.json', fs.constants.R_OK);
        configFileError = false;
        config = require('../config.json');
        console.log(configFileError)
    } catch (err) {
        configFileError = true;
        console.log(err)
    }

    if (configFileError === false) {
        connection = mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port
        });
    } else {
        connection = mysql.createConnection({
            host: process.env.MYSQL_ADDON_HOST,
            user: process.env.MYSQL_ADDON_USER,
            database: process.env.MYSQL_ADDON_DB,
            password: process.env.MYSQL_ADDON_PASSWORD,
            port: process.env.MYSQL_ADDON_PORT
        });
        console.log(process.env.TEST);
    }


    app.get('/', (req, res) => {
        connection.query(
            'SELECT * FROM `data`',
            function(err, results) {
                res.json(results)
            }
        );
    })

    // app.get('/login', (req, res) => {
    //     res.render('pages/login/index')
    // })

    // app.post('/login', (req, res) => {
    //     let formPassword = crypto.createHmac('sha256', req.body.password);
    //     connection.query('SELECT * FROM users WHERE password = ?', formPassword, function (error, results, fields) {
    //         if (error) throw error;
    //         console.log(results);
    //     });
    // })

    app.get('/water/:data', (req, res) => {
        let sensorData = { sensor: `water`, data: `${req.params.data}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.redirect(200, '/');
        });
    })

    app.get('/temperature/:data', (req, res) => {
        let sensorData = { sensor: `temperature`, data: `${req.params.data}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.redirect(200, '/');
        });
    })

    app.get('/lightning/:data', (req, res) => {
        let sensorData = { sensor: `lightning`, data: `${req.params.data}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.redirect(200, '/');
        });
    })
}