module.exports = (app, ejs, fs, mysql, config, crypto) => {
    let pool  = mysql.createPool({
        connectionLimit : 5,
        host            : process.env.MYSQL_ADDON_USER | config.database.user,
        user            : process.env.MYSQL_ADDON_USER | config.database.user,
        password        : process.env.MYSQL_ADDON_PASSWORD | config.database.password,
        database        : process.env.MYSQL_ADDON_DB | config.database.host
    });

    app.get('/', (req, res) => {
        fs.readFile('data.txt', (err, data) => {
            if (err) throw err;

            res.render('pages/index', {
                data: data
            })
        });
    })

    // Login
    app.get('/login', (req, res) => {
        res.render('pages/login/index')
    })

    app.post('/login', (req, res) => {
        let formPassword = crypto.createHmac('sha256', req.body.password);
        pool.query('SELECT * FROM users WHERE password = ?', formPassword, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
        });
    })

    // End of Login
    app.get('/water/:data', (req, res) => {
        res.send();
        /*connection.connect();
         let sensorData = {sensor: water, data: req.params.data}
        connection.query('INSERT INTO data SET ?', sensorData)

        connection.end();*/
    })
    app.get('/temperature/:data', (req, res) => {
        res.send(req.params.data);
    })
    app.get('/lightning/:data', (req, res) => {
        fs.writeFile('data.txt', req.params.data, (err) => {
            if (err) throw err;
            res.send(req.params.data);
        });
    })
}
